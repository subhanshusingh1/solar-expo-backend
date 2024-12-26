// controllers/scoreController.js
import Score from '../model/Score.js';
import User from '../model/User.js'; // Assuming User model is defined in User.js

// Controller to handle score submission
export const submitScore = async (req, res) => {
  try {
    const { phone, score, gameType, playerName } = req.body;

    // Validate required inputs
    if (!phone || !score || !gameType || !playerName) {
      return res.status(400).json({ 
        error: 'Phone, score, game type, and player name are required' 
      });
    }

    // Find user by phone number
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new score entry with user ID
    const newScore = new Score({
      userId: user._id,  // Required by Score model
      playerName,        // Required by Score model
      score,            // Required by Score model
      gameType,         // Required by Score model
    });

    // Save the score to the database
    await newScore.save();

    res.status(201).json({ 
      success: true, 
      message: 'Score submitted successfully',
      score: newScore
    });
  } catch (error) {
    console.error('Error submitting score:', error);
    res.status(500).json({ error: 'An error occurred while submitting the score' });
  }
};

// Controller to fetch leaderboard for all users (sorted by score descending)
export const getLeaderboard = async (req, res) => {
  try {
    // Fetch all scores and sort by score in descending order (highest first)
    const leaderboard = await Score.find()
      .select('playerName score -_id')  // Only select playerName and score, exclude _id
      .sort({ score: -1 })  // Sort by score in descending order
      .limit(10);  // Limit results to top 10

    // Send the leaderboard as a response
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'An error occurred while fetching the leaderboard' });
  }
};
