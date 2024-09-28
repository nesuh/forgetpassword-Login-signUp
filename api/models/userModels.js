const pool = require('../config/dbConnect');

// Create User Table
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      fullname VARCHAR(100) NOT NULL,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT FALSE
    );
  `;
  await pool.query(query);
};

createUserTable();

// Add a new user to the DB (for signup)
const addUser = async (fullname,username,email, hashedPassword, isAdmin=false ) => {
  const query = `INSERT INTO users (fullname,username,email, password, isAdmin) VALUES ($1, $2, $3,$4,$5) RETURNING *`;
if(query)
    console.log('users table Created sucssfully');
  const values = [fullname,username,email, hashedPassword, isAdmin];
  const result = await pool.query(query, values);
  return result.rows[0];

};

// Find a user by username (for login)
const findUserByUsername = async (username) => {
  const query = `SELECT * FROM users WHERE username = $1 `;
  const result = await pool.query(query, [username]);
  return result.rows[0];
};

module.exports = { addUser, findUserByUsername };
