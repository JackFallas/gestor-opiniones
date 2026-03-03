`use strict`;
//Importaciones 
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';


import userRoutes from '../src/user/user.routes.js'
import publicationRoutes from '../src/publication/publication.routres.js'
import commentRoutes from '../src/comments/comments.routes.js'
import registerRoutes from '../src/register/register.routes.js'

const BASE_URL = '/gestorDeOpiniones/v1';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
};

const routes = (app) => {
    app.use(`${BASE_URL}/users`, userRoutes);
    app.use(`${BASE_URL}/publications`, publicationRoutes);
    app.use(`${BASE_URL}/comments`, commentRoutes);
    app.use(`${BASE_URL}/login`, registerRoutes);
}

const initServer = async (app) => {
    app = express();
    const PORT = process.env.PORT || 3001;
    try {
        dbConnection();
        middlewares(app);
        routes(app);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`URL Base: http://localhost:${PORT}${BASE_URL}`);
        });

        app.get(`${BASE_URL}/HEAD`, (req, res) => {
            res.status(200).json({
                status: 'success',
                service: 'Gestor de Opiniones',
                version: '1.0.0'
            }
            );
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);

    }
}
export { initServer };