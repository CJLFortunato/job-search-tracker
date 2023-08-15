import express from "express";

const router = express.Router();

router.route('/').get((req, res) => {
    res.send('Snakes');
  });;

export default router;