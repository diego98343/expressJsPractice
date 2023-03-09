const mongoose = require('mongoose');

const connectingString = 'mongodb+srv://diego98343:3253633Aa@cluster0.ubwlczw.mongodb.net/taskManager?retryWrites=true&w=majority';

const connectDB = (url) => {
    return mongoose.connect(connectingString,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
 })
}

module.exports = connectDB;

// mongoose.connect(connectingString,{
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// })
// .then(()=>{ console.log('CONNECTED TO DATA BASE')})
// .catch((err)=>console.log(err));