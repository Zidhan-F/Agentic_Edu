const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  concept_id: { type: String, required: true },
  conceptName: { type: String, required: true },
  difficulty_level: { type: Number, required: true }, // 1 to 5
  correct_answer: { type: String, required: true },
  options: [{ type: String }],
  explanation: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
