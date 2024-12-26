// models/scoreModel.js
import mongoose from 'mongoose';
import User from './User.js';

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: 'User',
      required: true,
    },
    playerName: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    gameType: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

const Score = mongoose.model('Score', scoreSchema);

export default Score;
