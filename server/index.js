require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const { simulationRouter } = require('./routers/simulationRouters');
const { userRouter } = require('./routers/userRouters');
const { feedbackRouter } = require('./routers/feedbackRouters');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
