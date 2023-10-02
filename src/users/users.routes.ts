import express from 'express';

const router = express.Router();

// GET current user, protected
router.route('/:id').get((req, res) => {
  const test: string = 'get current user';
  res.send(test);
});

// POST register user
router.route('/register').post((req, res) => {
  const test: string = 'register user';
  res.send(test);
});

// PUT modify current user, protected
router.route('/:id').put((req, res) => {
  const test: string = 'modify user';
  res.send(test);
});

// DELETE current user, protected
router.route('/:id').delete((req, res) => {
  const test: string = 'delete user';
  res.send(test);
});

// POST login
router.route('/login').post((req, res) => {
  const test: string = 'login';
  res.send(test);
});

export default router;
