import express from 'express';
import { searchFlights } from '../controllers/flightsController.js';

const router = express.Router();

// GET /api/flights/search
router.get('/search', searchFlights);

export default router;
