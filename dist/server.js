import express from 'express';
import dotenv from 'dotenv';
import appsRouter from './applications/apps.routes.js';
import connectDB from './db/db.js';
import userRouter from './users/users.routes.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();
app.use('/v1/api/apps', appsRouter);
app.use('/v1/api/users', userRouter);
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));
//# sourceMappingURL=server.js.map