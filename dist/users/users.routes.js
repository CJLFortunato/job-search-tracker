import express from 'express';
const router = express.Router();
// GET current user, protected
router.route('/:id').get((req, res) => {
    const test = 'get current user';
    res.send(test);
});
// POST register user
router.route('/register').post((req, res) => {
    const test = 'register user';
    res.send(test);
});
// PUT modify current user, protected
router.route('/:id').put((req, res) => {
    const test = 'modify user';
    res.send(test);
});
// DELETE current user, protected
router.route('/:id').delete((req, res) => {
    const test = 'delete user';
    res.send(test);
});
// POST login
router.route('/login').post((req, res) => {
    const test = 'login';
    res.send(test);
});
export default router;
//# sourceMappingURL=users.routes.js.map