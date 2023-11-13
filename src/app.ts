import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { CommonRoutesConfig } from './common/routes.config';
import TodoRoutes from './routes/todo';
import { Logger } from '../logger';

dotenv.config();

const app: Application = express();
const routes: Array<CommonRoutesConfig> = [];
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW), // Max 15 minutes
    max: parseInt(process.env.RATE_LIMIT), // limit each IP to 15 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: async (req: Request, res: Response) => {
        const message = 'Too many requests, please try again later.';
        Logger.warn(message);
        res.status(429).json({
            status: 'WARNING',
            message,
        });
    },
});

app.use(express.json());

// CORS
app.use(cors());

// Helmet
app.use(helmet());

// Rate limiter
app.use(limiter);

// Routes (add routes to routes array)

routes.push(new TodoRoutes(app));

// Health Check
app.get('/health', (req: Request, res: Response) => {
    Logger.debug('Health Check: OK.');
    res.status(200).json({
        status: 'OK',
        message: 'Server is running.',
    });
});

// Unhandled routes
app.all('*', (req: Request, res: Response) => {
    Logger.error(`Unhandled route: ${req.url}`);
    res.status(404).json({
        status: 'ERROR',
        message: `Route ${req.originalUrl} not found.`,
    });
});

export { app };
