const express = require('express');
const apiRouter = express.Router();

const minionRouter = require('./minions');
const ideasRouter = require('./ideas');
const meetingsRouter = require('./meetings');

apiRouter.use('/minions', minionRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
