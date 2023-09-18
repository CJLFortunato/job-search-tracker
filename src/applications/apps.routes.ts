import express from 'express';

const router = express.Router();

router.route('/').get((req, res) => {
  const test: string = 'snakes';
  res.send(test);
});

export default router;
