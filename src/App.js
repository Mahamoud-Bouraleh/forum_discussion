import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './composants/Login';
// Import du composant SignUp
import Menu from './composants/Menu';
import SignUp from './composants/SingnUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> {/* Route pour l'enregistrement */}
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
