import React, { useState } from 'react';
import api from '../api';

const AjouterTache = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');

  const ajouterTache = async (e) => {
    e.preventDefault();
    try {
      await api.post('/taches', { nom, description });
      alert('Tâche ajoutée avec succès !');
      setNom('');
      setDescription('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche :', error);
      alert('Erreur lors de l\'ajout de la tâche. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <h2>Ajouter une tâche</h2>
      <form onSubmit={ajouterTache}>
        <label htmlFor="nom">Nom :</label>
        <input
          type="text"
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <br />
        <label htmlFor="description">Description :</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AjouterTache;
