const UserTopicProficiency = require('../models/UserTopicProficiency');

class PathAgentService {
  static async calculateNextBestTopic(userId) {
    try {
      const proficiencies = await UserTopicProficiency.find({ userId });
      
      if (!proficiencies || proficiencies.length === 0) {
        return { action: "CONTINUE_NORMAL_PATH", message: "Mari mulai belajar dari topik dasar!" };
      }

      // Sort by mastery score (ascending for weakest, descending for strongest)
      const sortedProficiencies = [...proficiencies].sort((a, b) => a.masteryScore - b.masteryScore);
      const weakestTopic = sortedProficiencies[0];
      const strongestTopic = sortedProficiencies[sortedProficiencies.length - 1];

      // Heuristic Rule: If gap is large, redirect to weakest
      if (weakestTopic.masteryScore < 60 && strongestTopic.masteryScore > 80) {
        return {
          action: "REDIRECT_TO_WEAKEST",
          topicId: weakestTopic.topicId,
          topicName: weakestTopic.topicName,
          message: `Saya melihat kamu sudah ahli di ${strongestTopic.topicName}, mari kita perkuat ${weakestTopic.topicName} agar seimbang!`
        };
      }
      
      return { 
        action: "CONTINUE_NORMAL_PATH", 
        topicId: weakestTopic.topicId,
        topicName: weakestTopic.topicName,
        message: `Lanjutkan belajarmu di topik ${weakestTopic.topicName}.`
      };
    } catch (error) {
      console.error("Error in PathAgentService for user:", userId, error);
      return { action: "ERROR", message: "Agen Strategist sedang menganalisis data awal Anda..." };
    }
  }
}

module.exports = PathAgentService;
