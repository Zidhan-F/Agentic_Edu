const cron = require('node-cron');
const User = require('../models/User');

const initCronJobs = () => {
  // Run every midnight (0 0 * * *)
  // For testing purposes, we can also run it every minute (* * * * *)
  cron.schedule('0 0 * * *', async () => {
    console.log("Running Streak Protector Cron Job...");
    try {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const atRiskUsers = await User.find({ 
        last_login: { $lt: threeDaysAgo }, 
        streak: { $gt: 5 } 
      });

      atRiskUsers.forEach(user => {
        // In a real app, send an email or push notification here
        console.log(`[STREAK ALERT] User ${user.email} (ID: ${user._id}): Streak ${user.streak} harimu terancam! Kerjakan 1 soal cepat untuk mempertahankannya.`);
      });
    } catch (error) {
      console.error("Cron Job Error:", error);
    }
  });
  console.log("Streak Protector Cron Job Initialized.");
};

module.exports = { initCronJobs };
