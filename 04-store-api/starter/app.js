require('dotenv').config();
require('express-async-errors');
// async errors 
const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products')
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');




//middleware
app.use(express.json());


app.get('/', (req, res) => {
    res.send('<h1>HEYYYYoo</h1>');
})

app.use('/api/v1/products',productsRouter);

//product route


app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
    try {
        //connectDB
        await connectDB(process.env.MANGO_URI);
        app.listen(port,console.log(`Server is listenig port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();