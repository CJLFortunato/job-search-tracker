import express from 'express';
const router = express.Router();
router.route('/').get((req, res) => {
    const test = 'snakes';
    res.send(test);
});
export default router;
//# sourceMappingURL=apps.routes.js.map