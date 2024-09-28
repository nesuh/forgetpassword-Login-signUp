const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json("Access denied!");

  const token = authHeader.split(' ')[1];
  jwt.verify(token, 'mysecretkey', (err, user) => {
    if (err) return res.status(403).json("Invalid token!");
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
