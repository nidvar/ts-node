import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import {mainRouter} from './routes/routes';
import {notesRoutes} from './routes/notesRoutes';
import {mongooseConnection} from './db/db';

dotenv.config();

export const createApp = async ()=>{
    await mongooseConnection();

    const app = express();

    app.get('/', (req, res) => {
      res.send('Backend is alive!');
    });
    
    app.use(express.json());

    const allowedOrigins = [
        'https://cybermern.vercel.app',
        'http://localhost:5173',
    ];

    app.use(cors({
    origin: (origin, callback) => {
        console.log('Request origin:', origin);
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
        return callback(null, true);
        } else {
        return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
    }));
    app.use(cookieParser());

    app.use('/', mainRouter);
    app.use('/notes', notesRoutes);

    return app;
};
