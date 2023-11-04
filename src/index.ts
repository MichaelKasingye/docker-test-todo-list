import dotenv from 'dotenv';

import { dataSource } from './data-source';
import { app } from './app';
import { Logger } from '../logger';

dotenv.config();
dataSource
    .initialize()
    .then(async () => {
        Logger.info('Database connection initialized.');

        const port = process.env.PORT || 9000;

        // Start the cron job
        // startCronJob();

        // Start the Server
        app.listen(port, () => {
            Logger.info(`Environment set to "${process.env.NODE_ENV}".`);
            Logger.info(`Server running on http://localhost:${port}.`);
        });
    })
    .catch((error) => {
        Logger.error('Error during Data Source initialization', error);
    });
