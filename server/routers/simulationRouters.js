const { Router } = require('express');
const { simulationController } = require('../controllers/simulationController');

const simulationRouter = Router();

simulationRouter.get('/', simulationController.getSimulations);
simulationRouter.get('/:id', simulationController.getSimulation);
simulationRouter.post('/', simulationController.createSimulation);
simulationRouter.put('/:id', simulationController.updateSimulation);
simulationRouter.delete('/:id', simulationController.deleteSimulation);

module.exports = { simulationRouter };