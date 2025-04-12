const express = require('express');
const router = express.Router();
const db = require('../../PGDB.js');

//get all sets from competitive.pokemon_sets
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM competitive.pokemon_sets');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching pokemon sets:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get by pokemon_name
router.get('/search/:pokemon_name', async (req, res) => {
  const pokemonName = req.params.pokemon_name;
  try {
    const { rows } = await db.query('SELECT * FROM competitive.pokemon_sets WHERE pokemon_name = $1', [pokemonName]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching Pokemon:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get from competitive.v_team_sets
router.get('/team_sets', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM competitive.v_team_sets');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching team sets:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get team sets by team_id
router.get('/team_sets/:team_id', async (req, res) => {
  const teamId = req.params.team_id;
  try {
    const { rows } = await db.query('SELECT * FROM competitive.v_team_sets WHERE team_id = $1', [teamId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching team sets:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get team sets by coach_id and league_id buyt accept wild card for any league_id
router.get('/team_sets/:coach_id/:league_id', async (req, res) => {
  const coachId = req.params.coach_id;
  const leagueId = req.params.league_id;
  try {
    const { rows } = await db.query('SELECT * FROM competitive.v_team_sets WHERE coach_id = $1 AND league_id = $2', [coachId, leagueId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching team sets:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
