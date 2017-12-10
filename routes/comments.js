const express = require('express');

const knex = require('../knex');

const router = express.Router();

router.get('/pins/:pinid/comments', async (req, res) => {
  try {
    const pinid = ~~req.params.pinid;
    const comments = await knex('comments')
      .where('pin_id', pinid)
      .returning('*');
    res.json(comments);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
