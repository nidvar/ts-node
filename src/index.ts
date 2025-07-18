import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import {mainRouter} from './routes/routes';
import {notesRoutes} from './routes/notesRoutes';

import {mongooseConnection} from './db/db';

dotenv.config();

mongooseConnection();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/', mainRouter);
app.use('/notes', notesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Process .env gives us PORT: ', PORT);
});
