const express = require('express');
const router = express.Router();
const db = require('../PGDB.js');

/*
 Table Definitions
"column_name"	"data_type"	"is_nullable"
"id"	"bigint"	"NO"
"tier_text"	"text"	"NO"
"pokemon"	"text"	"NO"
"league_id"	"text"	"NO"
*/

// Get all tiers
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM league.tier');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching tier:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new tier
router.post('/', async (req, res) => {
  const { id, tier_text, pokemon, league_id } = req.body;
  try {
    const query = `
      INSERT INTO league.tier (id, tier_text, pokemon, league_id)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [id, tier_text, pokemon, league_id];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting into tier:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a tier by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { tier_text, pokemon, league_id } = req.body;
  try {
    const query = `
      UPDATE league.tier
      SET tier_text = COALESCE($1, tier_text),
          pokemon = COALESCE($2, pokemon),
          league_id = COALESCE($3, league_id)
      WHERE id = $4 RETURNING *`;
    const values = [tier_text, pokemon, league_id, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tier not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating tier:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;