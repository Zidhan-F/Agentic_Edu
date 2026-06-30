const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Question = sequelize.define('Question', {
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
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  concept_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conceptName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty_level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  correct_answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  explanation: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
  tableName: 'questions',
});

module.exports = Question;
