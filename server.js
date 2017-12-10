const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const PORT = parseInt(process.env.PORT, 10) || 8000;

const users = require('./routes/users');

const authentication = require('./routes/authentication');

const pins = require('./routes/pins');

const comments = require('./routes/comments');

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

server.use(authentication);
server.use(users);
server.use(pins);
server.use(comments);

server.all('*', (req, res) => {
  res.sendStatus('405');
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`); // eslint-disable-line no-console
});

module.exports = server;
