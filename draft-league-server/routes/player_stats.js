const express = require('express');
const router = express.Router();
const db = require('../PGDB.js');

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM replay.player_stats');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching player_stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { coach, losses, total_games, wins, win_rate_percent } = req.body;
  try {
    const query = `
      INSERT INTO replay.player_stats (coach, losses, total_games, wins, win_rate_percent)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [coach, losses, total_games, wins, win_rate_percent];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting into player_stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:coach', async (req, res) => {
  const id = req.params.coach;
  const { coach, losses, total_games, wins, win_rate_percent } = req.body;
  try {
    const query = `
      UPDATE replay.player_stats
      SET coach = COALESCE($1, coach),
        losses = COALESCE($2, losses),
        total_games = COALESCE($3, total_games),
        wins = COALESCE($4, wins),
        win_rate_percent = COALESCE($5, win_rate_percent)
      WHERE coach = ${6} RETURNING *`;
    const values = [coach, losses, total_games, wins, win_rate_percent, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'player_stats not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating player_stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
