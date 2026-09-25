/**
 * Contrôleur pour les recherches de vols (mock)
 */
export const searchFlights = async (req, res) => {
  try {
    const { from, to, date, class: travelClass } = req.query;

    if (!from || !to || !date) {
      return res.status(400).json({ success: false, message: 'Paramètres from, to et date requis.' });
    }

    // Retourne des résultats mock pour le développement local
    const flights = [
      {
        id: 'fl-1',
        airline: 'Air Mooves',
        departureTime: '08:30',
        arrivalTime: '10:15',
        from,
        to,
        price: 120,
        class: travelClass || 'Economy'
      },
      {
        id: 'fl-2',
        airline: 'Cameroon Air',
        departureTime: '13:00',
        arrivalTime: '14:45',
        from,
        to,
        price: 150,
        class: travelClass || 'Economy'
      }
    ];

    return res.status(200).json({ success: true, flights });
  } catch (error) {
    console.error('Erreur recherche vols:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.', error: error.message });
  }
};

export default { searchFlights };
