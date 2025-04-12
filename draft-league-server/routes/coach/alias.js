const express = require('express');
const router = express.Router();
const db = require('../../PGDB.js');

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM league.alias');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching alias:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { coach_id, alias_text } = req.body;
  try {
    const query = `
      INSERT INTO league.alias (coach_id, alias_text)
      VALUES ($1, $2) RETURNING *`;
    const values = [coach_id, alias_text];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting into alias:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:coach_id', async (req, res) => {
  const id = req.params.coach_id;
  const { coach_id, alias_text } = req.body;
  try {
    const query = `
      UPDATE league.alias
      SET coach_id = COALESCE($1, coach_id),
        alias_text = COALESCE($2, alias_text)
      WHERE coach_id = ${3} RETURNING *`;
    const values = [coach_id, alias_text, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'alias not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating alias:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
