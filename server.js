// server.js
const express = require('express');
const http = require('http');
const booksRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');
const swaggerSpec = require('./config/swagger'); // to'g'ri import
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());


// Swagger hujjatlari
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Kitoblar va autentifikatsiya yo'nalishlari
app.use('/books', booksRoutes);

app.use('/auth', authRoutes);



const server = http.createServer(app);
server.listen(3000, () => {
  console.log('Server ishga tushdi: http://localhost:3000');
  console.log('Swagger hujjatlari: http://localhost:3000/api-docs');
});
