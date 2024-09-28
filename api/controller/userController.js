const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addUser, findUserByUsername } = require('../models/userModels');

// Signup Controller
const signup = async (req, res) => {
  const { fullname, username, email, password, isAdmin } = req.body;

  try {
    // Check if the username already exists
    const userExist = await findUserByUsername(username);
    if (userExist) {
      return res.status(400).json({ message: `The username ${username} is already in use!` });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add a new user
    const newUser = await addUser(fullname, username, email, hashedPassword, isAdmin);
    res.status(200).json({ message: 'Signup Successful', user: newUser });
  } catch (err) {
    res.status(400).json({ message: 'Signup Failed', error: err.message });
  }
};

// Login Controller
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

    // Generate JWT tokens
    const accessToken = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'mysecretkey', { expiresIn: '20m' });
    const refreshToken = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'myrefreshkey', { expiresIn: '7d' });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred during login!', error: error.message });
  }
};

// Refresh Token Controller
const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Token missing!' });

  jwt.verify(token, 'myrefreshkey', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token!' });

    const newAccessToken = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'mysecretkey', { expiresIn: '20m' });
    res.json({ accessToken: newAccessToken });
  });
};

module.exports = { signup, login, refreshToken };
