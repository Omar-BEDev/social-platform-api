import express from 'express';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import {  generalLimiter } from './middleware/rate-limit';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(express.json());


app.use('/users/login');
app.use(generalLimiter);

export default app;