const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Kitoblar API',
    version: '1.0.0',
    description: 'Foydalanuvchi va kitoblar bilan ishlash uchun API',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ BearerAuth: [] }], // Hammasiga umumiy o'rnatish
  tags: [
    {
      name: 'Auth',
      description: 'Foydalanuvchi autentifikatsiyasi',
    },
  ],

};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Bu yo‘lda barcha marshrutlar fayllaringiz joylashgan bo'lishi kerak
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;