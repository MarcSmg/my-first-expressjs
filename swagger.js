import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import pkg from './package.json' with { type: 'json' };
const version = pkg.version;

import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Books and Notes API',
            version: version,
            description: 'API documentation for Books and Notes management',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./index.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app, port) {
    // Swagger UI setup
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    console.log(`Swagger UI available at http://localhost:${port}/docs`);

}

export default setupSwagger;
