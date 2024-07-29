const { Router } = require('express');
const { qustionnareController } = require('../controllers/questionnaireController');

const questionnaireRouter = Router();

// questionnaireRouter.get('/', qustionnareController.getQuestionnaire);
questionnaireRouter.get('/:feedbackID', qustionnareController.getQuestionnaire);

module.exports = { questionnaireRouter };