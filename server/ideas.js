const ideasRouter = require('express').Router();
const bodyParser = require('body-parser');

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

ideasRouter.use(bodyParser.json());

// Finder 
ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
      req.idea = idea;
      next();
    } else {
      res.sendStatus(404);
    }
  })


ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
})

ideasRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
})

ideasRouter.put('/ideaId', (req, res, next) => {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
})

module.exports = ideasRouter;