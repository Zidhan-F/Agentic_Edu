const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, unique: true, sparse: true },
  picture: { type: String },
  last_login: { type: Date, default: Date.now },
  streak: { type: Number, default: 0 },
  lastQuizDate: { type: Date },
  badges: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
