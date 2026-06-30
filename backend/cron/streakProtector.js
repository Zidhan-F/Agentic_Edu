const cron = require('node-cron');
const { Op } = require('sequelize');
const { User } = require('../models');

const checkStreakProtection = async () => {
  console.log("Running Streak Protector Check...");
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const atRiskUsers = await User.findAll({ 
      where: {
        last_login: { [Op.lt]: threeDaysAgo }, 
        streak: { [Op.gt]: 5 } 
      }
    });

    atRiskUsers.forEach(user => {
      console.log(`[STREAK ALERT] User ${user.email} (ID: ${user.id}): Streak ${user.streak} harimu terancam! Kerjakan 1 soal cepat untuk mempertahankannya.`);
    });
    return atRiskUsers;
  } catch (error) {
    console.error("Streak Protector Error:", error);
    throw error;
  }
};

const initCronJobs = () => {
  cron.schedule('0 0 * * *', async () => {
    await checkStreakProtection();
  });
  console.log("Streak Protector Cron Job Initialized.");
};

module.exports = { initCronJobs, checkStreakProtection };
