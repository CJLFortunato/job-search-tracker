import express from 'express';
import dotenv from 'dotenv';


import appsRouter from './applications/apps.routes';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use('/api/apps', appsRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});