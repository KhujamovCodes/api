// controllers/authController.js
const jwt = require('jsonwebtoken');
const users = []; // Foydalanuvchilar uchun oddiy massiv

const generateToken = (username) => {
  return jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' }); // Tokenni 1 soatlik muddat bilan yarating
};

exports.register = (req, res) => {
  const { username, password } = req.body;

  // Foydalanuvchi mavjudligini tekshiring
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  // Foydalanuvchini qo'shish
  const newUser = { username, password };
  users.push(newUser);

  // Token yaratish
  const token = generateToken(username);
  res.status(201).json({ message: 'User registered successfully', token });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Foydalanuvchi ma'lumotlarini tekshirish
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  // Token yaratish
  const token = generateToken(username);
  res.json({ message: 'Logged in successfully', token });
};
