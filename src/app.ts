import express from 'express';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';

dotenv.config();


const app = express();

app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(express.json());

export default app;