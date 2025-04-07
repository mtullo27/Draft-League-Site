const express = require('express');
const router = express.Router();
const db = require('../PGDB.js');

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM replay.kill_leaders');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching kill_leaders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { total_kills, coach, pokemon } = req.body;
  try {
    const query = `
      INSERT INTO replay.kill_leaders (total_kills, coach, pokemon)
      VALUES ($1, $2, $3) RETURNING *`;
    const values = [total_kills, coach, pokemon];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting into kill_leaders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:total_kills', async (req, res) => {
  const id = req.params.total_kills;
  const { total_kills, coach, pokemon } = req.body;
  try {
    const query = `
      UPDATE replay.kill_leaders
      SET total_kills = COALESCE($1, total_kills),
        coach = COALESCE($2, coach),
        pokemon = COALESCE($3, pokemon)
      WHERE total_kills = ${4} RETURNING *`;
    const values = [total_kills, coach, pokemon, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'kill_leaders not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating kill_leaders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
