const { Router } = require('express');
const { questionnaireController } = require('../controllers/questionnaireController');

const questionnaireRouter = Router();

questionnaireRouter.get('/:feedbackID', questionnaireController.getQuestionnaire);

module.exports = { questionnaireRouter };