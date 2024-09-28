const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
  user:postgres,
  host:'localhost',
  database:process.env.DATABASE,
  password:process.env.PASSWORD,
  port:process.env.PORT,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the PostgreSQL database');
  }
});

module.exports = pool;
