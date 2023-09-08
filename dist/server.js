import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import appsRouter from './applications/apps.routes.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();
app.use('/api/apps', appsRouter);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map