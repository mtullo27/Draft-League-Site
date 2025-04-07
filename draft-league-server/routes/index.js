var express = require('express');
var router = express.Router();
const db = require('../PGDB.js');

//pass in table name and will return column defintions
export async function getTableDefinition(tableName) {
  try {
    const query = `
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = $1
    `;
    const { rows } = await db.query(query, [tableName]);
    return rows;
  } catch (err) {
    console.error('Error fetching table definition:', err);
    throw err;
  }
}
module.exports = router;
