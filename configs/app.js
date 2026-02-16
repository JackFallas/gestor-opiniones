`use strict`;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Importaciones
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './db.js';
import { corsOption } from './cors-configuration.js';
import { helmetConfiguration } from './helmet-configuration.js';

const BASE_URL = '/gestor-opiniones/v1';

//Rutas
import { dbConnection } from './db.js';

const middlewares = (app) => {
    // Implementacion de seguridad.
    app.use(helmet(helmetConfiguration));
    // Configuracion de CORS. 
    app.use(cors(corsOption));
    // Permite el uso de formulario y su limite de tamaño es de 10mb
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    // Permite el uso de JSON y su limite de tamaño es de 10mb
    app.use(express.json({ limit: '10mb' }));
    // Permite el uso de morgan en modo desarrollo
    app.use(morgan('dev'));
};

// Integracion de todas las rutas
const routes = (app) => {


    app.use(`${BASE_URL}/`,);
};

// Funcion para iniciar el servidor
const initServer = async (app) => {
    // Creacion de la instancia de la aplicacion
    app = express();
    const PORT = process.env.PORT || 3001;
    try {
        // Configuracion de los middlewares (Mi aplicacion)
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
                service: 'Gestor de opiniones',
                version: '1.0.0'
            }
            );
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);

    }
}
export { initServer };