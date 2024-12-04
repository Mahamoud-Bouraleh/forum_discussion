const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Remplacez par votre mot de passe MySQL
  database: 'forum_discussion', // Nom de votre base de données
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

// Endpoint pour l'authentification
app.post('/login', (req, res) => {
  const { nom, motPasse } = req.body;

  // Requête SQL pour vérifier les identifiants
  const query = 'SELECT * FROM utilisateur WHERE nom = ? AND mot_passe = ?';

  db.query(query, [nom, motPasse], (err, results) => {
    if (err) {
      console.error('Erreur SQL :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (results.length > 0) {
      // Connexion réussie
      res.json({ success: true, message: 'Connexion réussie' });
    } else {
      // Connexion échouée
      res.status(401).json({ success: false, message: 'Nom ou mot de passe incorrect' });
    }
  });
});

// Endpoint pour l'inscription
app.post('/signup', (req, res) => {
  const { nom, motPasse } = req.body;

  if (!nom || !motPasse) {
    return res.status(400).json({ success: false, message: 'Veuillez remplir tous les champs' });
  }

  // Requête SQL pour insérer un utilisateur
  const query = 'INSERT INTO utilisateur (nom, mot_passe) VALUES (?, ?)';

  db.query(query, [nom, motPasse], (err, results) => {
    if (err) {
      console.error('Erreur SQL :', err);
      return res.status(500).json({ success: false, message: 'Erreur lors de l\'enregistrement' });
    }

    res.json({ success: true, message: 'Utilisateur enregistré avec succès' });
  });
});


// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
