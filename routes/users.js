const express = require('express');

const bcrypt = require('bcryptjs');

const knex = require('../knex');

const router = express.Router();

router.post('/users', async (req, res) => {
  try {
    const credentials = req.body;
    if (!credentials.email || !credentials.password || !credentials.username) {
      res.sendStatus(400);
    } else {
      credentials.hashed_password = await bcrypt.hash(credentials.password, 12);
      delete credentials.password;
      const record = await knex('users')
        .insert(credentials)
        .returning('*');
      return res.json(record[0]);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});
module.exports = router;
