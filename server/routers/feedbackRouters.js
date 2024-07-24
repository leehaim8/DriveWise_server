const { Router } = require('express');
const { feedbackController } = require('../controllers/feedbackController');

const feedbackRouter = Router();

feedbackRouter.post('/:userId', feedbackController.createFeedback);

module.exports = { feedbackRouter };