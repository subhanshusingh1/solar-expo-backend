// routes/scoreRoutes.js
import express from 'express';
import { submitScore, getLeaderboard } from '../controller/scoreController.js';

const router = express.Router();

// POST request to submit a score
router.post('/submit', submitScore);

// GET request to retrieve the leaderboard for a specific game
router.get('/leaderboard', getLeaderboard);

export default router;
