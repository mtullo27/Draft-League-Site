const express = require('express');
const router = express.Router();
const db = require('../PGDB.js');

/* 
"column_name"	"data_type"	"is_nullable"
"id"	"text"	"NO"
"name"	"text"	"NO"
"commissioner_id"	"uuid"	"NO"
"min_team_size"	"integer"	"NO"
"max_team_size"	"integer"	"NO"
"format"	"text"	"YES"
"active"	"boolean"	"NO"
*/

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM league.league');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching leagues:', err);
    res.status(500).json({ error: 'Internal server error' });
  }});

  //dynamic post request to add a league
router.post('/', async (req, res) => {
    const { name, commissioner_id, min_team_size, max_team_size, format } = req.body;
    try {
        const query = `
        INSERT INTO league.league (name, commissioner_id, min_team_size, max_team_size, format)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [name, commissioner_id, min_team_size, max_team_size, format];
        const { rows } = await db.query(query, values);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('Error creating league:', err);
        res.status(500).json({ error: 'Internal server error' });
    }}
);

//dynamic update to only update the fields that are passed in
router.put('/:id', async (req, res) => {
    const leagueId = req.params.id;
    const { name, commissioner_id, min_team_size, max_team_size, format } = req.body;
    try {
        const query = `
        UPDATE league.league
        SET name = COALESCE($1, name),
            commissioner_id = COALESCE($2, commissioner_id),
            min_team_size = COALESCE($3, min_team_size),
            max_team_size = COALESCE($4, max_team_size),
            format = COALESCE($5, format)
        WHERE id = $6 RETURNING *`;
        const values = [name, commissioner_id, min_team_size, max_team_size, format, leagueId];
        const { rows } = await db.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'League not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error updating league:', err);
        res.status(500).json({ error: 'Internal server error' });
    }}
);

//get league by id
router.get('/:id', async (req, res) => {
    const leagueId = req.params.id;
    try {
        const { rows } = await db.query('SELECT * FROM league.league WHERE id = $1', [leagueId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'League not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching league:', err);
        res.status(500).json({ error: 'Internal server error' });
    }}
);

//get all teams in a league by league id from league.v_coaches_teams
router.get('/teams/:id', async (req, res) => {
    const leagueId = req.params.id;
    try {
      const { rows } = await db.query('SELECT * FROM league.v_coaches_teams WHERE league_id = $1', [leagueId]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'League not found' });
      }
      res.json(rows);
    } catch (err) {
      console.error('Error fetching league teams:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//get all league stats from league.v_league_coach_stats
router.get('/stats/:id', async (req, res) => {
    const leagueId = req.params.id;
    try {
      const { rows } = await db.query('SELECT * FROM league.v_league_coach_stats WHERE league_id = $1', [leagueId]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'League not found' });
      }
      res.json(rows);
    } catch (err) {
      console.error('Error fetching league stats:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;


