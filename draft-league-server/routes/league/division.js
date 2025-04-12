const express = require('express');
const router = express.Router();
const db = require('../../PGDB.js');
const { v4: uuidv4 } = require('uuid');

/*
"column_name"	"data_type"	"is_nullable"
"id"	"uuid"	"NO"
"league_id"	"text"	"NO"
"name"	"text"	"NO"
 */

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM league.division');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching divisions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);

// dynamic post request to add a division
router.post('/', async (req, res) => {
  const { league_id, name } = req.body;
  const id = uuidv4(); // Generate a new UUID for the division ID
  try {
    const query = `
      INSERT INTO league.division (id, league_id, name)
      VALUES ($1, $2, $3) RETURNING *`;
    const values = [id, league_id, name];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error creating division:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);

// dynamic update to only update the fields that are passed in
router.put('/:id', async (req, res) => {
  const divisionId = req.params.id;
  const { league_id, name } = req.body;
  try {
    const query = `
      UPDATE league.division
      SET league_id = COALESCE($1, league_id),
          name = COALESCE($2, name)
      WHERE id = $3 RETURNING *`;
    const values = [league_id, name, divisionId];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Division not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating division:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);

module.exports = router;