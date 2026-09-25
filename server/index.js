import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import carRentalRoutes from './routes/carRentalRoutes.js';
import { db } from './config/firebase.js';
import flightsRoutes from './routes/flightsRoutes.js';
import http from 'http';


dotenv.config();

const app = express();
let port = process.env.PORT || 5000;


// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      'http://localhost:5173',
      'http://localhost:5175',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5175',
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/car-rental', carRentalRoutes);
app.use('/api/flights', flightsRoutes);

// Endpoint pour soumettre les messages de contact
app.post('/api/contact/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'name, email et message sont requis.' });
    }

    const contactDoc = {
      name,
      email,
      message,
      createdAt: new Date(),
      source: req.ip || 'unknown'
    };

    const docRef = await db.collection('contacts').add(contactDoc);

    return res.status(201).json({ success: true, message: 'Message reçu et enregistré', id: docRef.id });
  } catch (error) {
    console.error('Erreur enregistrement contact:', error);
    return res.status(500).json({ success: false, message: 'Erreur lors de l\'enregistrement', error: error.message });
  }
});

// Route de santé
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Serveur en bonne santé',
    timestamp: new Date(),
  });
});

// Gestion des routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
  });
});

// Démarrer le serveur avec gestion des ports
function startServer() {
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${port}`);
    console.log(`🔒 CORS activé pour: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} est déjà utilisé. Tentative sur le port ${parseInt(port) + 1}...`);
      port = parseInt(port) + 1;
      startServer(); // Réessayer avec le port suivant
    } else {
      console.error('Erreur du serveur:', err);
    }
  });
}

startServer();

export default app;
