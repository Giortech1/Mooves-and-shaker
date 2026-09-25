import "./Contact.css";
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.message) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erreur ${response.status}: ${text || response.statusText}`);
      }

      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await response.json() : null;

      if (data && data.success) {
        alert("Votre message a été envoyé avec succès !");
        setForm({ name: "", email: "", message: "" }); // Réinitialise le formulaire
      } else {
        alert("Erreur: " + (data?.message || 'Réponse inattendue du serveur'));
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      alert("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="contact-page">
      <Navbar />

      {/* HERO / FORM SECTION */}
      <section className="contact-hero">
        <h1>
          Contact <span>Us</span>
        </h1>

        <div className="contact-grid">
          {/* GET IN TOUCH CARD */}
          <div className="contact-info-card">
            <h2>
              Get <span>in Touch</span>
            </h2>

            <p className="info-line">BP 482 Douala - Makepe montée BM</p>
            <p className="info-line">business@moove-location.com</p>
            <p className="info-line bold">
              +237 653 1716 34 | 692 38 29 17
            </p>
            <p className="info-line bold">
              +237 653 1716 34 | 692 38 29 17
            </p>
          </div>

          {/* FORM */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <textarea
              name="message"
              placeholder="How can we help you?"
              rows="6"
              value={form.message}
              onChange={handleChange}
            ></textarea>

            <button type="submit" className="btn-send">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
