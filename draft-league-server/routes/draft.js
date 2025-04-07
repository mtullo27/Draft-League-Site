const express = require('express');
const router = express.Router();
const db = require('../PGDB.js');

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM league.draft');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching draft:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { pokemon_id, coach_id, pic_number, id } = req.body;
  try {
    const query = `
      INSERT INTO league.draft (pokemon_id, coach_id, pic_number, id)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [pokemon_id, coach_id, pic_number, id];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting into draft:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { pokemon_id, coach_id, pic_numbers } = req.body;
  try {
    const query = `
      UPDATE league.draft
      SET pokemon_id = COALESCE($1, pokemon_id),
        coach_id = COALESCE($2, coach_id),
        pic_number = COALESCE($3, pic_number),
        id = COALESCE($4, id)
      WHERE id = ${5} RETURNING *`;
    const values = [pokemon_id, coach_id, pic_number, id, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'draft not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating draft:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
