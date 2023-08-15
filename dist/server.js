import express from 'express';
const app = express();
const port = 5000;
app.get('/', (req, res) => {
    res.send('Snakes');
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map