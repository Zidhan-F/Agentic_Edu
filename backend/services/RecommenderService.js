const Question = require('../models/Question');
const Resource = require('../models/Resource');

class RecommenderService {
  static async getRecommendation(questionId, isCorrect) {
    if (isCorrect) return null;

    try {
      const question = await Question.findById(questionId);
      if (!question) return null;
      
      let recommendedResource = await Resource.findOne({ 
        concept_id: question.concept_id, 
        level_target: { $lte: question.difficulty_level } 
      }).sort({ level_target: -1 });

      // If not found by level, just get ANY resource for this concept
      if (!recommendedResource) {
        recommendedResource = await Resource.findOne({ concept_id: question.concept_id });
      }

      if (!recommendedResource) {
        // Fallback if no resource exists at all for this concept
        return {
          message: `Sepertinya kamu kesulitan di konsep ${question.conceptName}.`,
          resourceUrl: null,
          resourceTitle: `Pendalaman ${question.conceptName}`,
          conceptId: question.concept_id,
          instruction: question.explanation || 'Pelajari kembali logika dari pertanyaan tipe ini.'
        };
      }

      return {
        message: `Sepertinya kamu kesulitan di konsep ${question.conceptName}.`,
        resourceUrl: recommendedResource.content_url,
        resourceTitle: recommendedResource.title,
        conceptId: recommendedResource.concept_id,
        instruction: `Baca referensi ini selama ${recommendedResource.estimated_minutes} menit sebelum mencoba soal serupa.`
      };
    } catch (error) {
      console.error("Error in RecommenderService:", error);
      return null;
    }
  }
}

module.exports = RecommenderService;
