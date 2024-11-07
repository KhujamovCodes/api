// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Foydalanuvchi ro‘yxatdan o‘tganlar ma'lumotlar bazasi (buni haqiqiy ma'lumotlar bazasi bilan almashtirish kerak)
let users = [];

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Foydalanuvchi ro‘yxatdan o‘tishi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ro‘yxatdan o‘tish muvaffaqiyatli
 *       400:
 *         description: Noto'g'ri ma'lumot kiritildi
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Foydalanuvchi nomi va parolni tekshirish
  if (!username || !password) {
    return res.status(400).json({ message: 'Username va parol majburiy' });
  }

  // Parolni shifrlash
  const hashedPassword = await bcrypt.hash(password, 10);

  // Yangi foydalanuvchini saqlash
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi' });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Foydalanuvchi tizimga kirishi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tizimga kirish muvaffaqiyatli
 *       400:
 *         description: Foydalanuvchi nomi yoki parol noto‘g‘ri
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).json({ message: 'Foydalanuvchi topilmadi' });
  }

  // Parolni tekshirish
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Parol noto‘g‘ri' });
  }

  // JWT token yaratish
  const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });

  res.status(200).json({ message: 'Tizimga kirish muvaffaqiyatli', token });
});

module.exports = router;
