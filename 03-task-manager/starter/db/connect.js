const mongoose = require('mongoose');


const connectingString = 'mongodb+srv://diego98343:3253633Aa@cluster0.ubwlczw.mongodb.net/taskManager?retryWrites=true&w=majority';

mongoose.connect(connectingString)
.then(()=>{ console.log('CONNECTED TO DATA BASE')})
.catch((err)=>console.log(err));