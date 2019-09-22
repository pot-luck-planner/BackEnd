const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authenticate = require('../auth/authenticate-middleware.js');
const accountRouter = require('../account/account-router.js');
const eventsRouter = require('../events/events-router.js');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/account', accountRouter);
server.use('/events', eventsRouter)


server.get('/', (req, res) => {
  res.send('*****API RUNNING*****');
});

module.exports = server;