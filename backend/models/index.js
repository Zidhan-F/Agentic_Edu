const { sequelize } = require('../config/db');
const User = require('./User');
const Question = require('./Question');
const QuizHistory = require('./QuizHistory');
const Resource = require('./Resource');
const UserTopicProficiency = require('./UserTopicProficiency');

// Define Relationships
User.hasMany(QuizHistory, { foreignKey: 'userId', onDelete: 'CASCADE' });
QuizHistory.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(UserTopicProficiency, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserTopicProficiency.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Question,
  QuizHistory,
  Resource,
  UserTopicProficiency,
};
