const express = require('express');
const router = express.Router();
const db = require('../../PGDB.js');

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM league.roster');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching roster:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { league_id, coach_id, division_id } = req.body;
  try {
    const query = `
      INSERT INTO league.roster (league_id, coach_id, division_id)
      VALUES ($1, $2, $3) RETURNING *`;
    const values = [league_id, coach_id, division_id];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting into roster:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:league_id', async (req, res) => {
  const id = req.params.league_id;
  const { league_id, coach_id, division_id } = req.body;
  try {
    const query = `
      UPDATE league.roster
      SET league_id = COALESCE($1, league_id),
        coach_id = COALESCE($2, coach_id),
        division_id = COALESCE($3, division_id)
      WHERE league_id = ${4} RETURNING *`;
    const values = [league_id, coach_id, division_id, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'roster not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating roster:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
