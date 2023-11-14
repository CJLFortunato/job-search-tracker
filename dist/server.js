import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import appsRouter from './applications/apps.routes.js';
import connectDB from './db/db.js';
import errorHandler from './middlewares/errorMiddleware.js';
// import validatePayload from './middlewares/validateMiddleware.js';
import tagsRouter from './tags/tags.routes.js';
import userRouter from './users/users.routes.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.all('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});
// app.use(validatePayload);
app.use('/v1/api/apps', appsRouter);
app.use('/v1/api/tags', tagsRouter);
app.use('/v1/api/users', userRouter);
app.use(errorHandler);
// eslint-disable-next-line no-console
app.listen(port, () => console.log('Server has started'));
//# sourceMappingURL=server.js.map