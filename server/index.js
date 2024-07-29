require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;

const { simulationRouter } = require('./routers/simulationRouters');
const { userRouter } = require('./routers/userRouters');
const { feedbackRouter } = require('./routers/feedbackRouters');
const { questionnaireRouter } = require('./routers/questionnaireRouters');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.set("Content-Type", "application/json");
    next();
});

app.use('/api/users', userRouter);
app.use('/api/simulations', simulationRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/questionnaire', questionnaireRouter);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
