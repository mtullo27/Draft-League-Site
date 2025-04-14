const express = require('express');
const router = express.Router();
const db = require('../../PGDB.js');

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM league.info');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching info:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { league_id, value, version, id, key } = req.body;
  try {
    const query = `
      INSERT INTO league.info (league_id, value, version, id, key)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [league_id, value, version, id, key];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting into info:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { league_id, value, version, key } = req.body;
  try {
    const query = `
      UPDATE league.info
      SET league_id = COALESCE($1, league_id),
        value = COALESCE($2, value),
        version = COALESCE($3, version),
        id = COALESCE($4, id),
        key = COALESCE($5, key)
      WHERE id = ${6} RETURNING *`;
    const values = [league_id, value, version, id, key, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'info not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating info:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/active', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM public.info');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching active info:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
