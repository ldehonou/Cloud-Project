const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  host: 'db', // Utilisez le nom du service défini dans le fichier docker-compose.yml
  user: 'postgres',
  password: 'root',
  database: 'gestion_taches',
  port: 5432,
});

app.get('/', async (req, res) => {
    res.send('Hello World!');
})

app.get('/taches', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM taches ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des tâches.' });
  }
});

app.get('/taches/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await pool.query('SELECT * FROM taches WHERE id = $1', [id]);
  
      if (rows.length === 0) {
        res.status(404).send('Tâche non trouvée');
      } else {
        res.json(rows[0]);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur interne du serveur');
    }
  });
  

app.post('/taches', async (req, res) => {
  try {
    const { nom, description } = req.body;
    const result = await pool.query('INSERT INTO taches (nom, description) VALUES ($1, $2) RETURNING *', [nom, description]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création de la tâche.' });
  }
});

app.put('/taches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, etat } = req.body;
    const result = await pool.query('UPDATE taches SET nom = $1, description = $2, etat = $3 WHERE id = $4 RETURNING *', [nom, description, etat, id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche.' });
  }
});

app.delete('/taches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM taches WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression de la tâche.' });
  }
});

app.listen(port, () => {
  console.log(`API en écoute sur le port ${port}`);
});
