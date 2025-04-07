const express = require('express');
const router = express.Router();
const db = require('../PGDB.js');
const { v4: uuidv4 } = require('uuid');

/* 
"column_name"	"data_type"	"is_nullable"
"id"	"uuid"	"NO"
"username"	"text"	"NO"
"discord_user_id"	"text"	"YES"
"showdown_name"	"text"	"YES"
"sprite_url"	"text"	"YES"
"theme"	"text"	"YES"
"last_sign_on"	"timestamp without time zone"	"YES"
*/

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM league.coach');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching coaches:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get coach teams from league.v_coaches_teams
router.get('/teams/:id', async (req, res) => {
  const coachId = req.params.id;
  try {
    const { rows } = await db.query('SELECT * FROM league.v_coaches_teams WHERE coach_id = $1', [coachId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Coach not found' });
    }
    res.json(rows);
  } catch (err) {
    console.error('Error fetching coach teams:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get all teams in a league by league id from league.v_coaches_teams
router.get('/teams/league/:id', async (req, res) => {
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

//dynamic post request to add a coach
router.post('/', async (req, res) => {
  const { username, discord_user_id, showdown_name, sprite_url, theme } = req.body;
  const id = uuidv4(); // Generate a new UUID for the coach ID
  try {
    const query = `
      INSERT INTO league.coach (id, username, discord_user_id, showdown_name, sprite_url, theme)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [id, username, discord_user_id, showdown_name, sprite_url, theme];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error creating coach:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// dynamic update to only update the fields that are passed in
router.put('/:id', async (req, res) => {
  const coachId = req.params.id;
  const { username, discord_user_id, showdown_name, sprite_url, theme } = req.body;
  try {
    const query = `
      UPDATE league.coach
      SET username = COALESCE($1, username),
          discord_user_id = COALESCE($2, discord_user_id),
          showdown_name = COALESCE($3, showdown_name),
          sprite_url = COALESCE($4, sprite_url),
          theme = COALESCE($5, theme)
      WHERE id = $6 RETURNING *`;
    const values = [username, discord_user_id, showdown_name, sprite_url, theme, coachId];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Coach not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating coach:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//get coach by id
router.get('/:id', async (req, res) => {
  const coachId = req.params.id;
  try {
    const { rows } = await db.query('SELECT * FROM league.coach WHERE id = $1', [coachId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Coach not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching coach:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;