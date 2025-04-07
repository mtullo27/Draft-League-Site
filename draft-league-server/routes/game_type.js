const express = require('express');
const router = express.Router();
const db = require('../PGDB.js');

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM league.game_type');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching game_type:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { id, type_text } = req.body;
  try {
    const query = `
      INSERT INTO league.game_type (id, type_text)
      VALUES ($1, $2) RETURNING *`;
    const values = [id, type_text];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting into game_type:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { id, type_text } = req.body;
  try {
    const query = `
      UPDATE league.game_type
      SET id = COALESCE($1, id),
        type_text = COALESCE($2, type_text)
      WHERE id = ${3} RETURNING *`;
    const values = [id, type_text, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'game_type not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating game_type:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
