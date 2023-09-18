import express from 'express';

import dotenv from 'dotenv';

import appsRouter from './applications/apps.routes.js';
import connectDB from './db/db.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use('/api/apps', appsRouter);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));
