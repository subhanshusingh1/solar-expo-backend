// controllers/scoreController.js
import Score from '../model/Score.js';

// Controller to handle score submission
export const submitScore = async (req, res) => {
  try {
    const { phone, score, gameType } = req.body;

    // Validate inputs
    if (!phone || !score || !gameType) {
      return res.status(400).json({ error: 'Phone, score, and game type are required' });
    }

    // Create a new score entry
    const newScore = new Score({
      playerName: req.body.playerName || 'Anonymous',
      phone,
      score,
      gameType,
    });

    // Save the score to the database
    await newScore.save();

    res.status(201).json({ success: true, message: 'Score submitted successfully' });
  } catch (error) {
    console.error('Error submitting score:', error);
    res.status(500).json({ error: 'An error occurred while submitting the score' });
  }
};

// Controller to fetch leaderboard for all users (sorted by score ascending)
export const getLeaderboard = async (req, res) => {
  try {
    // Fetch all scores and sort by score in ascending order
    const leaderboard = await Score.find()
      .sort({ score: 1 })  // Sort by score in ascending order
      .limit(10);  // Limit results to top 10, remove if you want to fetch all users

    // Send the leaderboard as a response
    res.status(200).json({ success: true, leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'An error occurred while fetching the leaderboard' });
  }
};
