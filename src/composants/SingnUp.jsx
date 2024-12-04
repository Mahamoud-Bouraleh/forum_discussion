import React, { useState } from 'react';
import axios from 'axios';
import '../SignUp.css';  // Le CSS pour la page d'inscription

const SignUp = () => {
  const [nom, setNom] = useState('');
  const [motPasse, setMotPasse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        nom,
        motPasse,
      });

      if (response.data.success) {
        alert('Utilisateur créé avec succès');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Erreur lors de l\'inscription : ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div >
    <form onSubmit={handleSubmit}>
      <label className="signup-label">Nom : </label>
      <input
        type="text"
        value={nom}
        className="signup-input"
        onChange={(e) => setNom(e.target.value)}
      />
      <label className="signup-label">Mot de passe : </label>
      <input
        type="password"
        value={motPasse}
        className="signup-input"
        onChange={(e) => setMotPasse(e.target.value)}
      />
      <button type="submit" className="signup-button">S'enregistrer</button>
    </form></div>
  );
};

export default SignUp;
