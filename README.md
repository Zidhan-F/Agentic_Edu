# Agentic Edu

Agentic Edu is a modern, AI-powered educational platform designed to provide a personalized learning experience. By leveraging the Gemini API, real-time communication via Socket.io, and interactive dashboard interfaces, Agentic Edu adapts to each student's learning pace, tracking their progress and providing real-time tutoring.

---

## Key Features

* **Personal AI Tutor Chat (`AiTutorChat`)**: Interactive chat component driven by the Gemini API, helping students with their learning materials in real-time.
* **Interactive Dashboards**: Modern interface built with React, Vite, and TailwindCSS for viewing learning progress and topic proficiency.
* **Adaptive Quizzes & Reviews**: Take quizzes, track historical scores, and review answers with detailed AI insights.
* **Streak Protection & Engagement Nudges**: Automatic cron jobs and Socket.io triggers to nudge students, maintaining their daily learning streak.
* **Topic Proficiency Tracking**: Deep integration tracking student progress per topic using PostgreSQL and Sequelize.

---

## Tech Stack

### Frontend
* **Core**: React 18, Vite
* **Styling**: TailwindCSS
* **Build/Linting**: ESLint, PostCSS

### Backend
* **Core**: Node.js, Express.js
* **Database**: PostgreSQL (Sequelize ORM)
* **Real-time Communication**: Socket.io
* **AI/GenAI integration**: `@google/genai` (Gemini)
* **Automation**: `node-cron` for scheduling streaks

---

## Project Structure

```text
Agentic_Edu/
├── backend/            # Express backend API & Socket.io server
│   ├── config/         # Database configuration (Sequelize PostgreSQL)
│   ├── cron/           # Cron jobs (Streak protection, etc.)
│   ├── models/         # Sequelize models (User, Question, QuizHistory, etc.)
│   ├── seedContent/    # Seed data generator scripts
│   ├── services/       # Core business logic & AI recommendation agent services
│   ├── socket/         # Real-time WebSocket connection handling
│   ├── index.js        # Backend entry point
│   └── package.json    # Backend dependencies
│
└── frontend/           # React SPA application (Vite-based)
    ├── src/
    │   ├── assets/     # Images & vector assets
    │   ├── components/ # AI Tutor chat UI components
    │   ├── pages/      # Home, Dashboard, Quiz, Login, LearningMaterial
    │   ├── App.jsx     # App routing & setup
    │   └── main.jsx    # Frontend entry point
    ├── index.html
    └── package.json    # Frontend dependencies
```

---

## Installation & Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [PostgreSQL](https://www.postgresql.org/) (running locally or a cloud database instance)
* Gemini API Key

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables in a `.env` file:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/agentic_edu
   GOOGLE_CLIENT_ID=your_google_client_id
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Seed database (optional):
   You can seed the database by running:
   ```bash
   node addMoreQuestions.js
   ```
   Or trigger the seed endpoint `POST /api/seed` after running the backend.
5. Run the server:
   ```bash
   node index.js
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables in a `.env` file:
   ```env
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```
4. Run the frontend development server:
   ```bash
   npm run dev
   ```
