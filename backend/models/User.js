const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
  },
  picture: {
    type: DataTypes.STRING,
  },
  last_login: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  streak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastQuizDate: {
    type: DataTypes.DATE,
  },
  badges: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
}, {
  timestamps: true,
  tableName: 'users',
});

module.exports = User;
