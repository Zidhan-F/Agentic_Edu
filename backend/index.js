require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const { Server } = require('socket.io');
const { OAuth2Client } = require('google-auth-library');
const mongoose = require('mongoose');

const connectDB = require('./config/db');
const { initCronJobs } = require('./cron/streakProtector');
const { initSocket } = require('./socket/nudgeHandler');

const PathAgentService = require('./services/PathAgentService');
const RecommenderService = require('./services/RecommenderService');

const User = require('./models/User');
const UserTopicProficiency = require('./models/UserTopicProficiency');
const Question = require('./models/Question');
const Resource = require('./models/Resource');
const QuizHistory = require('./models/QuizHistory');
const { questions, resources } = require('./seedData');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize DB and Cron
connectDB();
initCronJobs();
initSocket(io);

// ── Routes ────────────────────────────────────────────────────────────

app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ email });
    if (user) {
      user.googleId = googleId;
      user.picture = picture;
      user.last_login = new Date();
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        googleId,
        picture,
        streak: 0,
      });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ error: 'Invalid Google Token' });
  }
});

app.get('/api/dashboard/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const recommendation = await PathAgentService.calculateNextBestTopic(userId);
    const user = await User.findById(userId);
    const proficiencies = await UserTopicProficiency.find({ userId });

    // Calculate Percentile (Rank)
    const allProficiencies = await UserTopicProficiency.find({});
    const userAverages = {};
    
    allProficiencies.forEach(p => {
      if (!userAverages[p.userId]) userAverages[p.userId] = { total: 0, count: 0 };
      userAverages[p.userId].total += p.masteryScore;
      userAverages[p.userId].count += 1;
    });

    const userScores = Object.values(userAverages).map(u => u.total / u.count);
    const currentUserAvg = userAverages[userId] ? (userAverages[userId].total / userAverages[userId].count) : 0;
    
    const countBelow = userScores.filter(s => s < currentUserAvg).length;
    const totalUsers = userScores.length || 1;
    const percentile = Math.max(1, Math.min(99, Math.round(100 - (countBelow / totalUsers * 100))));

    const history = await QuizHistory.find({ userId }).sort({ date: -1 }).limit(10);

    res.json({ recommendation, user, proficiencies, rank: percentile, history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/answer', async (req, res) => {
  try {
    const { userId, questionId, isCorrect } = req.body;
    
    // ── Update Streak Logic ──
    const user = await User.findById(userId);
    if (user) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      if (!user.lastQuizDate) {
        user.streak = 1;
        user.lastQuizDate = now;
      } else {
        const lastDate = new Date(user.lastQuizDate.getFullYear(), user.lastQuizDate.getMonth(), user.lastQuizDate.getDate());
        const diffTime = today - lastDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
          user.streak += 1;
          user.lastQuizDate = now;
        } else if (diffDays > 1) {
          user.streak = 1;
          user.lastQuizDate = now;
        }
        // if diffDays === 0, do nothing (streak already counted for today)
      }
      await user.save();
    }

    // 1. Get Recommendation (Agent Tutor logic)
    const recommendation = await RecommenderService.getRecommendation(questionId, isCorrect);
    
    // 2. Update Proficiency (Agent Strategist logic)
    const question = await Question.findById(questionId);
    if (question && userId) {
      const topicId = question.concept_id.split('_')[0]; // Simple mapping
      const topicNameMapping = {
        'logical': 'Logical Reasoning',
        'num': 'Numerical Ability',
        'verbal': 'Verbal Intelligence',
        'spatial': 'Spatial Reasoning',
        'pattern': 'Pattern Recognition'
      };
      const topicName = topicNameMapping[topicId] || 'Other';

      let proficiency = await UserTopicProficiency.findOne({ userId, topicName });
      
      if (!proficiency) {
        proficiency = new UserTopicProficiency({
          userId,
          topicId,
          topicName,
          correctAnswers: 0,
          totalAttempts: 0,
          masteryScore: 0
        });
      }

      proficiency.totalAttempts += 1;
      if (isCorrect) proficiency.correctAnswers += 1;
      
      // Calculate mastery percentage
      proficiency.masteryScore = Math.round((proficiency.correctAnswers / proficiency.totalAttempts) * 100);
      proficiency.lastAttempt = new Date();
      
      await proficiency.save();
    }

    res.json({ success: true, recommendation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/quiz-history', async (req, res) => {
  try {
    const { userId, score, total, percentage, estimatedIQ, label, categoryDetails, details } = req.body;
    const history = await QuizHistory.create({ userId, score, total, percentage, estimatedIQ, label, categoryDetails, details });
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/questions', async (req, res) => {
  try {
    const randomQuestions = await Question.aggregate([{ $sample: { size: 20 } }]);
    res.json(randomQuestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/questions/adaptive', async (req, res) => {
  try {
    const { difficulty, excludeIds } = req.query;
    let query = {};
    if (excludeIds) {
      const ids = excludeIds.split(',')
        .filter(id => id.length === 24)
        .map(id => new mongoose.Types.ObjectId(id));
      if (ids.length > 0) {
        query._id = { $nin: ids };
      }
    }
    
    let targetDiff = parseInt(difficulty) || 3;
    
    let questions = await Question.aggregate([
      { $match: { ...query, difficulty_level: targetDiff } },
      { $sample: { size: 1 } }
    ]);
    
    if (questions.length === 0) {
      questions = await Question.aggregate([
        { $match: query },
        { $sample: { size: 1 } }
      ]);
    }
    
    res.json(questions[0] || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/quiz-history/:id', async (req, res) => {
  try {
    const history = await QuizHistory.findById(req.params.id);
    if (!history) return res.status(404).json({ error: 'History not found' });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AI Tutor Chat Integration (Gemini)
app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });
  
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === '') {
    // Fallback if API key is not configured properly
    return res.json({ reply: "Sistem AI sedang dalam mode offline. Mohon periksa GEMINI_API_KEY Anda." });
  }

  try {
    let systemPrompt = `Anda adalah Tutor IQ yang cerdas, suportif, dan ramah. Gunakan bahasa Indonesia yang santai tapi profesional.
Tugas Anda adalah membantu pengguna memahami mengapa mereka salah menjawab pertanyaan kuis, memberikan analogi, dan menyemangati mereka. Jangan pernah berikan jawaban langsung jika mereka belum mencoba. Jangan gunakan markdown berlebihan, gunakan teks biasa dengan sedikit format.`;

    let userContext = `Pesan Pengguna: "${message}"`;
    if (context) {
      userContext = `Konteks Soal:
- Topik: ${context.conceptName}
- Pertanyaan Soal: ${context.content}
- Jawaban Benar: ${context.correctAnswer}
- Jawaban Pengguna (Salah): ${context.selectedAnswer}
- Penjelasan Asli Singkat: ${context.explanation}

Pesan Pengguna: "${message}"`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n\n' + userContext }] }
      ]
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini AI Error:", error);
    res.json({ reply: "Maaf, server AI sedang sibuk atau mengalami kendala jaringan. Coba tanyakan lagi sebentar ya!" });
  }
});

app.get('/api/resources/:conceptId', async (req, res) => {
  try {
    const { conceptId } = req.params;
    let resource = await Resource.findOne({ concept_id: conceptId });
    if (!resource) {
      resource = {
        title: 'Materi Pengayaan',
        concept_id: conceptId,
        level_target: 3,
        estimated_minutes: 5,
        explanation: 'Konsep ini belum memiliki materi pendalaman yang spesifik di database. Namun, pastikan Anda memahami dasar-dasar logika atau pola yang mendasari tipe soal ini.',
        keyPoints: [
          'Baca soal dengan teliti',
          'Pahami pola atau logika yang tersembunyi',
          'Banyak berlatih soal serupa'
        ],
        tip: 'Teruslah berlatih, karena kemampuan mengenali pola dan logika akan semakin tajam seiring waktu.'
      };
    }
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Seed Data ─────────────────────────────────────────────────────────

app.post('/api/seed', async (req, res) => {
  try {
    await User.deleteMany({});
    await UserTopicProficiency.deleteMany({});
    await Question.deleteMany({});
    await Resource.deleteMany({});

    const user = await User.create({
      name: 'Zidhan',
      email: 'zidhan@example.com',
      streak: 12
    });

    await UserTopicProficiency.create([
      { userId: user._id, topicId: 'logical', topicName: 'Logical Reasoning', correctAnswers: 3, totalAttempts: 10 },
      { userId: user._id, topicId: 'numerical', topicName: 'Numerical Ability', correctAnswers: 7, totalAttempts: 10 },
      { userId: user._id, topicId: 'verbal', topicName: 'Verbal Intelligence', correctAnswers: 9, totalAttempts: 10 },
      { userId: user._id, topicId: 'spatial', topicName: 'Spatial Reasoning', correctAnswers: 5, totalAttempts: 10 },
      { userId: user._id, topicId: 'pattern', topicName: 'Pattern Recognition', correctAnswers: 8, totalAttempts: 10 }
    ]);

    // ── IQ Test Questions & Resources (50 questions across 5 categories) ───────
    const questionsWithExplanations = questions.map(q => ({
      ...q,
      explanation: `Jawaban yang benar adalah ${q.correct_answer}. Evaluasi logika Anda berdasarkan konsep ${q.conceptName}.`
    }));
    await Question.insertMany(questionsWithExplanations);
    await Resource.insertMany(resources);

    res.json({ message: 'Database seeded!', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
