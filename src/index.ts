import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes/routes';
import {mongooseConnection} from './db/db';

dotenv.config();

mongooseConnection();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(router);
app.listen(8080, ()=>{
    console.log('running on port. I just changed nodemon', 8080);
});