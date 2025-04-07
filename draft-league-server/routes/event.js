const express = require('express');
const router = express.Router();
const db = require('../PGDB.js');

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM audit.event');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { event_text, id } = req.body;
  try {
    const query = `
      INSERT INTO audit.event (event_text, id)
      VALUES ($1, $2) RETURNING *`;
    const values = [event_text, id];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting into event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { event_text, id } = req.body;
  try {
    const query = `
      UPDATE audit.event
      SET event_text = COALESCE($1, event_text),
        id = COALESCE($2, id)
      WHERE id = ${3} RETURNING *`;
    const values = [event_text, id, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'event not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
