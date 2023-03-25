import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const ModifierEtatTache = () => {
  const { id } = useParams();
  const [tache, setTache] = useState(null);
  const [etat, setEtat] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTache = async () => {
      try {
        const response = await api.get(`/taches/${id}`);
        setTache(response.data);
        setEtat(response.data.etat);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la tâche:', error);
        setError(true);
      }
    };

    fetchTache();
  }, [id]);

  const modifierEtat = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/taches/${id}`, {
        nom: tache.nom,
        description: tache.description,
        etat,
      });
      alert('État de la tâche mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'état de la tâche:', error);
      alert('Erreur lors de la mise à jour de l\'état de la tâche. Veuillez réessayer.');
    }
  };

  if (!tache) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h2>Modifier l'état de la tâche : {tache.nom}</h2>
      <form onSubmit={modifierEtat}>
        <label htmlFor="etat">État :</label>
        <select
          id="etat"
          value={etat}
          onChange={(e) => setEtat(e.target.value === 'true')}
        >
          <option value={false}>En cours</option>
          <option value={true}>Terminée</option>
        </select>
        <br />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default ModifierEtatTache;
