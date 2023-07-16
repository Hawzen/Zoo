const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Zoo',
      version: '0.1.0',
    },
  },
  apis: [`./routes/*.js`],
};

const swaggerSpec = swaggerJSDoc(options);
console.log(swaggerSpec)


module.exports = swaggerSpec;