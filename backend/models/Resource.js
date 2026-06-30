const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Resource = sequelize.define('Resource', {
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  concept_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content_url: {
    type: DataTypes.STRING,
    defaultValue: '#',
  },
  level_target: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estimated_minutes: {
    type: DataTypes.INTEGER,
    defaultValue: 2,
  },
  explanation: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  keyPoints: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  example: {
    type: DataTypes.JSONB,
    defaultValue: { question: '', solution: '' },
  },
  tip: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
}, {
  timestamps: true,
  tableName: 'resources',
});

module.exports = Resource;
