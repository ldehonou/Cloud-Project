import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ListeTaches from './components/ListeTaches';
import AjouterTache from './components/AjouterTache';
import ModifierEtatTache from './components/ModifierEtatTache';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Liste des tâches</Link> | <Link to="/ajouter-tache">Ajouter une tâche</Link>
          </nav>
          <Routes>
            <Route path="/" element={<ListeTaches />} />
            <Route path="/ajouter-tache" element={<AjouterTache />} />
            <Route path="/modifier-etat-tache/:id" element={<ModifierEtatTache />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
