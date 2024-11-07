// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc'); // to'g'ri import

const swaggerDefinition = {
  openapi: '3.0.0',
  
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
  security: [{ BearerAuth: [] }], // Hammasiga umumiy o‘rnatish
};

// Swagger sozlamalari
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Yo‘nalishlarni to‘g‘ri ko‘rsating
};

module.exports = swaggerJSDoc(options); // swaggerJSDoc() funksiyasi bilan qaytish
