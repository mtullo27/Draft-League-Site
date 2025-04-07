const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER || 'your_pg_user',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'your_db_name',
  password: process.env.PGPASSWORD || 'your_pg_password',
  port: process.env.PGPORT || 5432,
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL pool error:', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
