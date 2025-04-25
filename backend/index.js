const express = require('express');
const pool = require('./config/db');

const app = express();

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error connecting to DB:', err);
  } else {
    console.log('✅ Connected to DB at:', res.rows[0].now);
  }
});

app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
