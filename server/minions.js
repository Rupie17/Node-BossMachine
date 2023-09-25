const minionRouter = require('express').Router();
const bodyParser = require('body-parser');

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

minionRouter.use(bodyParser.json());

// Finder middleware
minionRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
      req.minion = minion;
      next();
    } else {
      res.sendStatus(404);
    }
  })


minionRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.send(minions);
});

minionRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
})

minionRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
})

minionRouter.put('/:minionId', (req, res, next) => {
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
})

minionRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
})

// GET /api/minions/:minionId/work to get an array of all work for the specified minion.
minionRouter.get('/:minionId/work', (req, res, next) => {
    const minionWork = getAllFromDatabase('work').filter(work => {
        return work.minionId === req.params.minionId;
    })
    res.send(minionWork);
})

// POST /api/minions/:minionId/work to create a new work object and save it to the database.
minionRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = req.body;
    newWork.minionId = req.params.minionId;
    const createWork = addToDatabase('work', newWork);
    res.status(201).send(createWork);
})

// PUT /api/minions/:minionId/work/:workId to update a single work by id.
minionRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
        res.sendStatus(400);
    } else {
        let updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
})

// DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
minionRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
})

module.exports = minionRouter;