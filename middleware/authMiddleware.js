// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(403).json({ message: 'Token yo\'q' });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key'); // 'secret_key'ni xavfsiz joyda saqlang
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token noto‘g‘ri yoki muddati o‘tgan' });
  }
};

module.exports = authMiddleware;
