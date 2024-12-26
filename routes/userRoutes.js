import express from 'express';
import { registerUser } from '../controller/userController.js';

const router = express.Router();

// Registration route
router.post('/register', registerUser);

export default router;
