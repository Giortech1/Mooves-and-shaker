import express from 'express';
import { createCarRental, createCarRentalNoAuth } from '../controllers/carRentalController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Route protégée : seul un utilisateur connecté peut louer une voiture
router.post('/book', authenticateToken, createCarRental);

// Route de test (dev) : enregistre une réservation sans token
router.post('/book/no-auth', createCarRentalNoAuth);

export default router;