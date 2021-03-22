import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from "./routes/user.js";
import apisRouter from "./routes/apis.js";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// INITIALIZE APP AND IMPORTANT VARIABLES
const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.options('*', cors())
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'https://akfisafk-jubi.zeet.app/');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// })

// CONNECT MONGOOSE ATLAS
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PW = process.env.MONGO_PW
const connect_url = process.env.CONNECTION_URL;
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PW}@cluster0.g4c9g.mongodb.net/Jubi?retryWrites=true&w=majority`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))
// mongoose.connect('mongodb://localhost:27017/jubi', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.set('useFindAndModify', false);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use("/users", userRouter);
app.use("/apis", apisRouter);

// ERROR HANDLER
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong!'
    // res.json({ error: err })
    // res.status(statusCode).render('error', { err });
});