
const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect');
require('dotenv').config();

//middleware
app.use(express.json());

// routes
app.get('/hello',(request,response)=>{
response.send('task manager app')
});

app.use('/api/v1/tasks',tasks);
const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MANGO_URI);
        app.listen(port, console.log(`server is listening to port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();


