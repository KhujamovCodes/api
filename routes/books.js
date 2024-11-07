// routes/books.js
const express = require('express');
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/booksController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Kitoblarni olish
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Kitoblar muvaffaqiyatli olindi
 */
router.get('/', authMiddleware, getBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Kitobni ID orqali olish
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Kitobning ID raqami
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kitob muvaffaqiyatli olindi
 *       404:
 *         description: Kitob topilmadi
 */
router.get('/:id', authMiddleware, getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Yangi kitob yaratish
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               pages:
 *                 type: integer
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Yangi kitob muvaffaqiyatli yaratildi
 *       400:
 *         description: Ma'lumot noto'g'ri kiritilgan
 */
router.post('/', authMiddleware, createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Kitobni yangilash
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Kitobning ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               pages:
 *                 type: integer
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kitob muvaffaqiyatli yangilandi
 *       404:
 *         description: Kitob topilmadi
 */
router.put('/:id', authMiddleware, updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Kitobni o'chirish
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Kitobning ID raqami
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kitob muvaffaqiyatli o'chirildi
 *       404:
 *         description: Kitob topilmadi
 */
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
