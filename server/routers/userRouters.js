const { Router } = require('express');
const { userController } = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/:id', userController.getUser);
userRouter.post('/login', userController.login);

module.exports = { userRouter };