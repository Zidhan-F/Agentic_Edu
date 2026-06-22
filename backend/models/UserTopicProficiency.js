const mongoose = require('mongoose');

const userTopicProficiencySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topicId: { type: String, required: true },
  topicName: { type: String, required: true },
  correctAnswers: { type: Number, default: 0 },
  totalAttempts: { type: Number, default: 0 },
  masteryScore: { type: Number, default: 0 }, // 0 to 100
  lastAccessed: { type: Date, default: Date.now }
}, { timestamps: true });

// Auto-calculate mastery score before any save/validate
userTopicProficiencySchema.pre('validate', function () {
  if (this.totalAttempts > 0) {
    this.masteryScore = Math.round((this.correctAnswers / this.totalAttempts) * 100);
  } else {
    this.masteryScore = 0;
  }
});

module.exports = mongoose.model('UserTopicProficiency', userTopicProficiencySchema);
