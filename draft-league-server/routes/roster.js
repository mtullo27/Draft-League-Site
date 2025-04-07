const express = require('express');
const router = express.Router();
const db = require('../PGDB.js');
const { v4: uuidv4 } = require('uuid');

/*
"column_name"	"data_type"	"is_nullable"
"coach_id"	"uuid"	"NO"
"league_id"	"text"	"NO"
"division_id"	"uuid"	"NO"
 */

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM league.roster');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching roster:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);

// dynamic post request to add a roster
router.post('/', async (req, res) => {
  const { coach_id, league_id, division_id } = req.body;
  const id = uuidv4(); // Generate a new UUID for the roster ID
  try {
    const query = `
      INSERT INTO league.roster (coach_id, league_id, division_id)
      VALUES ($1, $2, $3) RETURNING *`;
    const values = [coach_id, league_id, division_id];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error creating roster:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);

// dynamic update to only update the fields that are passed in
router.put('/:id', async (req, res) => {
  const rosterId = req.params.id;
  const { coach_id, league_id, division_id } = req.body;
  try {
    const query = `
      UPDATE league.roster
      SET coach_id = COALESCE($1, coach_id),
          league_id = COALESCE($2, league_id),
          division_id = COALESCE($3, division_id)
      WHERE id = $4 RETURNING *`;
    const values = [coach_id, league_id, division_id, rosterId];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Roster not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating roster:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);

//get roster based on league_id and division_id
router.get('/league/:league_id/division/:division_id', async (req, res) => {
  const { league_id, division_id } = req.params;
  try {
    const query = `
      SELECT * FROM league.roster
      WHERE league_id = $1 AND division_id = $2`;
    const values = [league_id, division_id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Roster not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching roster:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);

//get rosters by league_id
router.get('/league/:league_id', async (req, res) => {
  const leagueId = req.params.league_id;
  try {
    const { rows } = await db.query('SELECT * FROM league.roster WHERE league_id = $1', [leagueId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Roster not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching roster:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);


module.exports = router;