import React, { useState } from 'react';
// Importe React et le hook `useState` pour gérer l'état dans le composant.

import { useNavigate } from 'react-router-dom';
// Importe `useNavigate` de `react-router-dom` pour permettre la navigation programmatique entre les pages.

import axios from 'axios';
// Importe la bibliothèque `axios` pour effectuer des requêtes HTTP.

import '../Login.css';
// Importe le fichier CSS `Login.css` pour styliser le composant.

import SignUp from './SingnUp';
// Importe le composant `SignUp` pour afficher le formulaire d'inscription si nécessaire.

const Login = () => {
  const [nom, setNom] = useState('');
  // Initialise l'état `nom` pour stocker le nom de l'utilisateur saisi dans le formulaire.

  const [motPasse, setMotPasse] = useState('');
  // Initialise l'état `motPasse` pour stocker le mot de passe de l'utilisateur.

  const [isSignUp, setIsSignUp] = useState(false);
  // Initialise l'état `isSignUp` pour gérer l'affichage entre le formulaire de connexion et d'inscription.

  const navigate = useNavigate();
  // Initialise `navigate` pour permettre la redirection vers une autre page après la connexion réussie.

  const handleLogin = async (e) => {
    e.preventDefault();
    // Empêche le comportement par défaut du formulaire, qui est de recharger la page.

    try {
      const response = await axios.post('http://localhost:5000/login', {
        nom,
        motPasse,
      });
      // Effectue une requête POST à l'endpoint `/login` avec les données `nom` et `motPasse`.

      if (response.data.success) {
        navigate('/menu');
        // Si la connexion réussit, redirige l'utilisateur vers la page `/menu`.
      } else {
        alert(response.data.message);
        // Sinon, affiche un message d'erreur provenant de la réponse du serveur.
      }
    } catch (error) {
      alert('Erreur lors de la connexion : ' + error.response?.data?.message || error.message);
      // Affiche une alerte si une erreur survient pendant la requête.
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    // Alterne l'état `isSignUp` entre `true` et `false` pour basculer entre les formulaires de connexion et d'inscription.
  };

  return (
    <div className="container">
      {/* Conteneur principal du formulaire */}
      <div className="login-container">
        {/* Sous-conteneur du formulaire */}
        <h1 className="login-title">{isSignUp ? 'S\'enregistrer' : 'Login'}</h1>
        {/* Affiche le titre "S'enregistrer" ou "Login" selon l'état `isSignUp` */}
        
        {isSignUp ? (
          <SignUp />
          // Si `isSignUp` est `true`, affiche le formulaire d'inscription (composant `SignUp`).
        ) : (
          <form onSubmit={handleLogin}>
            {/* Formulaire de connexion */}
            <label className="login-label">Nom : </label>
            {/* Label pour le champ du nom */}
            <input
              type="text"
              value={nom}
              className="login-input"
              onChange={(e) => setNom(e.target.value)}
              // Champ de saisie pour le nom ; met à jour l'état `nom` lorsque l'utilisateur tape.
            />
            <label className="login-label">Mot de passe : </label>
            {/* Label pour le champ du mot de passe */}
            <input
              type="password"
              value={motPasse}
              className="login-input"
              onChange={(e) => setMotPasse(e.target.value)}
              // Champ de saisie pour le mot de passe ; met à jour l'état `motPasse` lorsque l'utilisateur tape.
            />
            <button type="submit" className="login-button">
              Se connecter
              {/* Bouton pour soumettre le formulaire de connexion */}
            </button>
            <button type="button" className="signup-button" onClick={toggleForm}>
              {isSignUp ? 'Retour à la connexion' : 'S\'enregistrer'}
              {/* Bouton pour basculer entre le formulaire de connexion et d'inscription */}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
// Exporte le composant `Login` pour être utilisé dans d'autres fichiers.
