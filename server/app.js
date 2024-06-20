const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

//IMPORTS
const userRouter = require('./routers/userRouter')
const employeeRouter = require('./routers/employeeRouter')

const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json())

//DB CONNECT
const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/dealsday', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connected to db");
    } catch (error) {
        console.error("failed to connect to DB", error);
    }
}

connectDb();

//API's
app.use('/user',userRouter);
app.use('/employee',employeeRouter);


//SERVER LAUNCH
app.listen(3000, () => {
    console.log("server is up at 3000")
})