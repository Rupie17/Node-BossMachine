const meetingsRouter = require('express').Router();
const bodyParser = require('body-parser');

const { 
    addToDatabase,
    getAllFromDatabase,
    deleteFromDatabasebyId,
    createMeeting
  } = require('./db');

meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.send(meetings);
})


meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
})

meetingsRouter.delete('/', (req, res, next) => {
    deleteFromDatabasebyId('meetings');
    res.status(204).send();
})

module.exports = meetingsRouter;