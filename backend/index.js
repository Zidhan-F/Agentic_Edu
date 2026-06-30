require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const { Server } = require('socket.io');
const { OAuth2Client } = require('google-auth-library');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { connectDB, sequelize } = require('./config/db');
const { initCronJobs, checkStreakProtection } = require('./cron/streakProtector');
const { initSocket } = require('./socket/nudgeHandler');

const PathAgentService = require('./services/PathAgentService');
const RecommenderService = require('./services/RecommenderService');

const { User, UserTopicProficiency, Question, Resource, QuizHistory } = require('./models');
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
const initDB = async () => {
  await connectDB();
  await sequelize.sync();
};
initDB();
if (!process.env.VERCEL) {
  initCronJobs();
  initSocket(io);
}

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
    let user = await User.findOne({ where: { email } });
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

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nama, email, dan password wajib diisi' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email sudah terdaftar' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password_hash,
      streak: 0,
    });

    res.json({ success: true, user });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Gagal melakukan registrasi' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !user.password_hash) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    user.last_login = new Date();
    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Gagal melakukan login' });
  }
});

app.get('/api/dashboard/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userIdInt = parseInt(userId, 10);
    const recommendation = await PathAgentService.calculateNextBestTopic(userIdInt);
    const user = await User.findByPk(userIdInt);
    const proficiencies = await UserTopicProficiency.findAll({ where: { userId: userIdInt } });

    // Calculate Percentile (Rank)
    const allProficiencies = await UserTopicProficiency.findAll();
    const userAverages = {};
    
    allProficiencies.forEach(p => {
      if (!userAverages[p.userId]) userAverages[p.userId] = { total: 0, count: 0 };
      userAverages[p.userId].total += p.masteryScore;
      userAverages[p.userId].count += 1;
    });

    const userScores = Object.values(userAverages).map(u => u.total / u.count);
    const currentUserAvg = userAverages[userIdInt] ? (userAverages[userIdInt].total / userAverages[userIdInt].count) : 0;
    
    const countBelow = userScores.filter(s => s < currentUserAvg).length;
    const totalUsers = userScores.length || 1;
    const percentile = Math.max(1, Math.min(99, Math.round(100 - (countBelow / totalUsers * 100))));

    const history = await QuizHistory.findAll({ 
      where: { userId: userIdInt }, 
      order: [['date', 'DESC']], 
      limit: 10 
    });

    res.json({ recommendation, user, proficiencies, rank: percentile, history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/answer', async (req, res) => {
  try {
    const { userId, questionId, isCorrect } = req.body;
    const userIdInt = parseInt(userId, 10);
    const questionIdInt = parseInt(questionId, 10);
    
    // ── Update Streak Logic ──
    const user = await User.findByPk(userIdInt);
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
    const recommendation = await RecommenderService.getRecommendation(questionIdInt, isCorrect);
    
    // 2. Update Proficiency (Agent Strategist logic)
    const question = await Question.findByPk(questionIdInt);
    if (question && userIdInt) {
      const topicId = question.concept_id.split('_')[0]; // Simple mapping
      const topicNameMapping = {
        'logical': 'Logical Reasoning',
        'num': 'Numerical Ability',
        'verbal': 'Verbal Intelligence',
        'spatial': 'Spatial Reasoning',
        'pattern': 'Pattern Recognition'
      };
      const topicName = topicNameMapping[topicId] || 'Other';

      let proficiency = await UserTopicProficiency.findOne({ 
        where: { userId: userIdInt, topicName } 
      });
      
      if (!proficiency) {
        proficiency = await UserTopicProficiency.create({
          userId: userIdInt,
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
      proficiency.lastAccessed = new Date();
      
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
    const history = await QuizHistory.create({ 
      userId: parseInt(userId, 10), 
      score, 
      total, 
      percentage, 
      estimatedIQ, 
      label, 
      categoryDetails, 
      details 
    });
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/questions', async (req, res) => {
  try {
    const randomQuestions = await Question.findAll({
      order: sequelize.random(),
      limit: 20
    });
    res.json(randomQuestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/questions/adaptive', async (req, res) => {
  try {
    const { difficulty, excludeIds } = req.query;
    let where = {};
    if (excludeIds) {
      const ids = excludeIds.split(',')
        .map(id => parseInt(id.trim(), 10))
        .filter(id => !isNaN(id));
      if (ids.length > 0) {
        where.id = { [Op.notIn]: ids };
      }
    }
    
    let targetDiff = parseInt(difficulty) || 3;
    
    let questions = await Question.findAll({
      where: { ...where, difficulty_level: targetDiff },
      order: sequelize.random(),
      limit: 1
    });
    
    if (questions.length === 0) {
      questions = await Question.findAll({
        where: where,
        order: sequelize.random(),
        limit: 1
      });
    }
    
    res.json(questions[0] || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/quiz-history/:id', async (req, res) => {
  try {
    const history = await QuizHistory.findByPk(parseInt(req.params.id, 10));
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
    let resource = await Resource.findOne({ where: { concept_id: conceptId } });
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
    // Drop and re-create all tables
    await sequelize.sync({ force: true });

    const user = await User.create({
      name: 'Zidhan',
      email: 'zidhan@example.com',
      streak: 12
    });

    await UserTopicProficiency.bulkCreate([
      { userId: user.id, topicId: 'logical', topicName: 'Logical Reasoning', correctAnswers: 3, totalAttempts: 10 },
      { userId: user.id, topicId: 'numerical', topicName: 'Numerical Ability', correctAnswers: 7, totalAttempts: 10 },
      { userId: user.id, topicId: 'verbal', topicName: 'Verbal Intelligence', correctAnswers: 9, totalAttempts: 10 },
      { userId: user.id, topicId: 'spatial', topicName: 'Spatial Reasoning', correctAnswers: 5, totalAttempts: 10 },
      { userId: user.id, topicId: 'pattern', topicName: 'Pattern Recognition', correctAnswers: 8, totalAttempts: 10 }
    ], { individualHooks: true });

    // ── IQ Test Questions & Resources (50 questions across 5 categories) ───────
    const questionsWithExplanations = questions.map(q => ({
      ...q,
      explanation: `Jawaban yang benar adalah ${q.correct_answer}. Evaluasi logika Anda berdasarkan konsep ${q.conceptName}.`
    }));
    await Question.bulkCreate(questionsWithExplanations);
    await Resource.bulkCreate(resources);

    res.json({ message: 'Database seeded!', userId: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/cron/streak-protector', async (req, res) => {
  try {
    console.log("Streak protector endpoint triggered.");
    const users = await checkStreakProtection();
    res.json({ success: true, message: `Checked streak protection. ${users.length} users processed.` });
  } catch (err) {
    console.error("Streak protector API error:", err);
    res.status(500).json({ error: err.message });
  }
});

if (process.env.VERCEL) {
  module.exports = app;
} else {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
