const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const UserTopicProficiency = sequelize.define('UserTopicProficiency', {
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
  topicId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  topicName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correctAnswers: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  masteryScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastAccessed: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  tableName: 'user_topic_proficiencies',
  indexes: [
    {
      unique: true,
      fields: ['userId', 'topicName'],
    },
  ],
  hooks: {
    beforeValidate: (instance) => {
      if (instance.totalAttempts > 0) {
        instance.masteryScore = Math.round((instance.correctAnswers / instance.totalAttempts) * 100);
      } else {
        instance.masteryScore = 0;
      }
    },
  },
});

module.exports = UserTopicProficiency;
