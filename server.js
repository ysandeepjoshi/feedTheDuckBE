const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//set up DB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true})
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB database connection has been established successfully");
})
//const schedulingQueue = [];
const schedulingQueue = require("./models/schedulerHelper");
cron.schedule('0 0 * * *',function(){
    console.log('job running every 5 sec!');
    let processingQueue = schedulingQueue.getSchedulingQueue();
    //console.log(processingQueue);
    //console.log(processingQueue.length);
    if(processingQueue.length>0){        
       processingQueue.forEach((data)=>{
           //console.log(data);
            feeddataRouter.addAutomatedEntry(data);
       }) 
    }
})


const feeddataRouter= require("./routes/feeddata");
const userRouter= require("./routes/users");
const scheduleRouter= require("./routes/scheduler");
const loginRouter= require("./routes/login");
app.use('/login',loginRouter);
app.use('/users',userRouter);
app.use('/feeddata',feeddataRouter.router);
app.use('/schedules',scheduleRouter);





app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})