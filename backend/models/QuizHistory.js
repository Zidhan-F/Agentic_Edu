const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const QuizHistory = sequelize.define('QuizHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  _id: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.id;
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  percentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  estimatedIQ: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  label: {
    type: DataTypes.STRING,
  },
  categoryDetails: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  details: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'quiz_histories',
});

module.exports = QuizHistory;
