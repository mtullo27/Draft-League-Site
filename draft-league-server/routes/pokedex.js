const express = require('express');
const router = express.Router();
const db = require('../PGDB.js');

//get pokedex from public.pokedex
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM public.pokedex');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching pokedex:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//update only for sprite_url, pc_sprite_url, sprite_file_path, and pc_sprite_file_path
router.put('/', async (req, res) => {
  const { id, sprite_url, pc_sprite_url, sprite_file_path, pc_sprite_file_path } = req.body;
  try {
    const { rowCount } = await db.query(
      'UPDATE public.pokedex SET sprite_url = $1, pc_sprite_url = $2, sprite_file_path = $3, pc_sprite_file_path = $4 WHERE id = $5',
      [sprite_url, pc_sprite_url, sprite_file_path, pc_sprite_file_path, id]
    );
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json({ message: 'Pokemon updated successfully' });
  } catch (err) {
    console.error('Error updating Pokemon:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//select by pokemon_name
router.get('/:pokemon_name', async (req, res) => {
  const pokemonName = req.params.pokemon_name;
  try {
    const { rows } = await db.query('SELECT * FROM public.pokedex WHERE pokemon_name = $1', [pokemonName]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching Pokemon:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;