const activeSessions = new Map();

const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('start_session', ({ userId, questionId }) => {
      activeSessions.set(socket.id, { 
        userId, 
        questionId, 
        startTime: Date.now(),
        lastHeartbeat: Date.now()
      });
      console.log(`Session started for user ${userId} on question ${questionId}`);
    });

    socket.on('heartbeat', () => {
      const session = activeSessions.get(socket.id);
      if (session) {
        session.lastHeartbeat = Date.now();
      }
    });

    socket.on('submit_answer', () => {
      activeSessions.delete(socket.id);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
      activeSessions.delete(socket.id);
    });
  });

  // Check every 10 seconds for stuck users
  setInterval(() => {
    const currentTime = Date.now();
    for (const [socketId, session] of activeSessions.entries()) {
      // If 5 minutes (300,000 ms) have passed since start without submitting
      // Or 5 minutes since last heartbeat. Let's use start time for simplicity as requested: "dalam 5 menit tidak ada jawaban"
      // For testing, let's use 10 seconds (10000 ms) if we want to demonstrate it quickly, but sticking to 5 mins
      const elapsed = currentTime - session.startTime;
      if (elapsed > 300000 && !session.nudgeSent) {
        io.to(socketId).emit('agent_nudge', {
          type: 'HINT',
          content: 'Sepertinya kamu kesulitan. Coba ingat kembali konsep dasar atau baca materi terkait!'
        });
        session.nudgeSent = true; // prevent spamming
      }
    }
  }, 10000);
};

module.exports = { initSocket };
