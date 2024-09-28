const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Authentication API',
      version: '1.0.0',
      description: 'API for User Authentication',
      contact: {
        name: 'Developer',
      },
      servers: [{ url: 'http://localhost:5000' }],
    },
  },
  apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };


