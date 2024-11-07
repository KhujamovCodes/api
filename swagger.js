// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Books API',
    version: '1.0.0',
    description: 'API for managing books with JWT authorization',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
  tags: [
    {
      name: 'Auth',
      description: 'Auth API',
    },
    {
      name: 'Books',
      description: 'API for managing books',
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

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

module.exports = swaggerJSDoc(options);
