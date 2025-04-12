const express = require('express');
const router = express.Router();
const db = require('../../PGDB.js');

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM command.command');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching command:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { id, command_text } = req.body;
  try {
    const query = `
      INSERT INTO command.command (id, command_text)
      VALUES ($1, $2) RETURNING *`;
    const values = [id, command_text];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting into command:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { command_text } = req.body;
  try {
    const query = `
      UPDATE command.command
      SET id = COALESCE($1, id),
        command_text = COALESCE($2, command_text)
      WHERE id = ${3} RETURNING *`;
    const values = [id, command_text, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'command not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating command:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
