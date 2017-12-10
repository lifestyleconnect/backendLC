const express = require('express');

const knex = require('../knex');

const router = express.Router();

router.get('/pins/:userid', async (req, res) => {
  try {
    const userid = ~~req.params.userid;
    const pins = await knex('pins')
      .where('user_id', userid)
      .returning('*');
    res.json(pins);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
