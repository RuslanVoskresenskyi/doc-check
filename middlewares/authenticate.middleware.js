const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({message: 'Unauthorized'})
  }

  const secretKey = 'your-secret-key'; // Замініть на свій секретний ключ

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({message: 'Invalid token'})
    }
    req.user = user; // Додаємо інформацію про користувача до об'єкту запиту
    next();
  });
}

exports.authenticateToken = authenticateToken;