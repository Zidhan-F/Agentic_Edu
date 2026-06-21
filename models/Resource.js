const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  concept_id: { type: String, required: true },
  content_url: { type: String, default: '#' },
  level_target: { type: Number, required: true },
  estimated_minutes: { type: Number, default: 2 },
  explanation: { type: String, default: '' },
  keyPoints: [{ type: String }],
  example: {
    question: { type: String, default: '' },
    solution: { type: String, default: '' }
  },
  tip: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
