import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { mongooseConnection } from '../src/db/db';
import { mainRouter } from '../src/routes/routes';
import { notesRoutes } from '../src/routes/notesRoutes';

dotenv.config();
mongooseConnection();

const app = express();

const allowedOrigins = ['https://cybermern.vercel.app', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // if you're using cookies/auth headers
}));

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
  res.send('Backend is alive!');
});

app.use((req, res) => {
  res.status(404).send(`No route for ${req.method} ${req.url}`);
});

app.use('/', mainRouter);
app.use('/notes', notesRoutes);

export default app;
