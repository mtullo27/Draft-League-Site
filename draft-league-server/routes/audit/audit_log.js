const express = require('express');
const router = express.Router();
const db = require('../PGDB.js');

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM audit.audit_log');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching audit_log:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { id, coach_id, timestamp, event_id, audit_text } = req.body;
  try {
    const query = `
      INSERT INTO audit.audit_log (id, coach_id, timestamp, event_id, audit_text)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [id, coach_id, timestamp, event_id, audit_text];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting into audit_log:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const {coach_id, timestamp, event_id, audit_text } = req.body;
  try {
    const query = `
      UPDATE audit.audit_log
      SET id = COALESCE($1, id),
        coach_id = COALESCE($2, coach_id),
        timestamp = COALESCE($3, timestamp),
        event_id = COALESCE($4, event_id),
        audit_text = COALESCE($5, audit_text)
      WHERE id = ${6} RETURNING *`;
    const values = [id, coach_id, timestamp, event_id, audit_text, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'audit_log not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating audit_log:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
