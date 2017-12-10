const express = require('express');

const bcrypt = require('bcryptjs');

const knex = require('../knex');

const jwt = require('jsonwebtoken');

const JWTutil = require('./../env');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    console.log(username, password);

    const user = await knex('users')
      .where('username', username)
      .returning('*');

    const verifiedUser = await bcrypt.compare(password, user[0].hashed_password);

    if (verifiedUser) {
      const token = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 60 * 60, id: user[0].id },
        JWTutil.JWT_KEY,
      );
      res.json({ token });
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
});

module.exports = router;
