
const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect');
require('dotenv').config(); 
const notFound = require('./middleware/not-found');
const errorHandlerMiddlewere = require('./middleware/errorHandler')

//middleware
app.use(express.static('./public'));
app.use(express.json());


app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddlewere);
const port = process.env.PORT

const start = async () => {
    try {
        await connectDB(process.env.MANGO_URI);
        app.listen(port, console.log(`server is listening to port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();


