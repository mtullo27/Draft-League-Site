const express = require('express');
const router = express.Router();
const db = require('../../PGDB.js');

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM command.command_queue');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching command_queue:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { arguments, timestamp, coach_id, id } = req.body;
  try {
    const query = `
      INSERT INTO command.command_queue (arguments, timestamp, coach_id, id)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [arguments, timestamp, coach_id, id];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting into command_queue:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { arguments, timestamp, coach_id } = req.body;
  try {
    const query = `
      UPDATE command.command_queue
      SET arguments = COALESCE($1, arguments),
        timestamp = COALESCE($2, timestamp),
        coach_id = COALESCE($3, coach_id),
        id = COALESCE($4, id)
      WHERE id = ${5} RETURNING *`;
    const values = [arguments, timestamp, coach_id, id, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'command_queue not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating command_queue:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
