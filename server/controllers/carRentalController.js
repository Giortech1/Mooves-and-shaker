import { db } from '../config/firebase.js';

/**
 * Enregistrer une nouvelle demande de location de voiture
 * POST /api/car-rental/book
 */
export const createCarRental = async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation, pickupDate, dropoffDate, carType } = req.body;
    const userId = req.user.uid; // Récupéré via le middleware d'auth

    // Validation simple
    if (!pickupLocation || !dropoffLocation || !pickupDate || !dropoffDate) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis.',
      });
    }

    // Création de l'objet de réservation
    const rentalData = {
      userId,
      pickupLocation,
      dropoffLocation,
      pickupDate: new Date(pickupDate),
      dropoffDate: new Date(dropoffDate),
      carType: carType || 'Standard',
      status: 'pending', // Pour que l'admin puisse traiter la demande
      createdAt: new Date(),
    };

    // Enregistrement dans Firestore
    const docRef = await db.collection('car_rentals').add(rentalData);

    return res.status(201).json({
      success: true,
      message: 'Demande de location enregistrée avec succès.',
      bookingId: docRef.id
    });
  } catch (error) {
    console.error('Erreur lors de la réservation de voiture:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'enregistrement.',
      error: error.message
    });
  }
};

// Version de test: enregistre une réservation sans vérifier le token (pour développement)
export const createCarRentalNoAuth = async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation, pickupDate, dropoffDate, carType } = req.body;

    if (!pickupLocation || !dropoffLocation || !pickupDate || !dropoffDate) {
      return res.status(400).json({ success: false, message: 'Tous les champs sont requis.' });
    }

    const rentalData = {
      userId: req.body.userId || 'dev-test-user',
      pickupLocation,
      dropoffLocation,
      pickupDate: new Date(pickupDate),
      dropoffDate: new Date(dropoffDate),
      carType: carType || 'Standard',
      status: 'pending',
      createdAt: new Date(),
      devTest: true,
    };

    const docRef = await db.collection('car_rentals').add(rentalData);

    return res.status(201).json({ success: true, message: 'Test booking enregistré.', bookingId: docRef.id });
  } catch (error) {
    console.error('Erreur lors de la réservation (no-auth):', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur lors de l\'enregistrement.', error: error.message });
  }
};