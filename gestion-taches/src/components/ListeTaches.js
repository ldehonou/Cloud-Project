import React, { useEffect, useState } from 'react';
import api from '../api';
import '../App.css';
import { Link } from 'react-router-dom';



function ListeTaches() {
  const [taches, setTaches] = useState([]);

  const supprimerTache = async (id) => {
    try {
      await api.delete(`/taches/${id}`);
      // Actualiser la liste des tâches après la suppression
      const newTaches = taches.filter((tache) => tache.id !== id);
      setTaches(newTaches);
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
      alert('Erreur lors de la suppression de la tâche. Veuillez réessayer.');
    }
  };
  

  useEffect(() => {
    const fetchTaches = async () => {
      try {
        const response = await api.get('/taches');
        setTaches(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    };

    fetchTaches();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Liste des tâches</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>État</th>
              <th>Action</th>
              <th>Supprimer</th>

            </tr>
          </thead>
          <tbody>
            {taches.map((tache) => (
              <tr key={tache.id}>
              <td>{tache.id}</td>
              <td>{tache.nom}</td>
              <td>{tache.description}</td>
              <td>{tache.etat ? 'Terminée' : 'En cours'}</td>
              <td>
                <Link to={`/modifier-etat-tache/${tache.id}`}>Modifier l'état</Link>
              </td>
              <td>
                <button onClick={() => supprimerTache(tache.id)}>Supprimer</button>
              </td>
            </tr>
                    
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default ListeTaches;
