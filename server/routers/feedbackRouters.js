const { Router } = require('express');
const { feedbackController } = require('../controllers/feedbackController');

const feedbackRouter = Router();

feedbackRouter.get('/', feedbackController.getFeedbacks);
feedbackRouter.get('/:id', feedbackController.getFeedback);
feedbackRouter.post('/:userId', feedbackController.createFeedback);

module.exports = { feedbackRouter };