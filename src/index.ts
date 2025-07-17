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

app.listen(8080, ()=>{
    console.log('running on port. I just changed nodemon', 8080);
});