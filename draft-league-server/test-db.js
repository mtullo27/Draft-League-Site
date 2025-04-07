const db = require('./PGDB.js');

(async () => {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('Postgres time:', result.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('DB test failed:', err);
    process.exit(1);
  }
})();
