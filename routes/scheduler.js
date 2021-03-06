const router = require("express").Router();

let Schedule = require("../models/scheduler.model");
let scheduleHelper = require("../models/schedulerHelper");

router.route('/delete').post((req,res)=>{
    let scheduleList = scheduleHelper.getSchedulingQueue();
    //remove schedule task from array.
let inputUsername = req.body.username;
console.log(inputUsername);
let filteredList = scheduleList.filter((item)=>item.username!==inputUsername)
scheduleHelper.setSchedulingQueue(filteredList);
Schedule.deleteOne({username:req.body.username})
        .then(() => res.json('information deleted.'))
        .catch(err => res.status(400).json('Error : '+ err));
    })
    
router.route('/').get((req,res)=>{
    Schedule.find()
        .then(schedules => res.json(schedules))
        .catch(err => res.status(400).json('Error : '+ err));
    });

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const scheduled = req.body.scheduled;
    const feedTime =  req.body.feedTime;
    const feedLocation =  req.body.feedLocation;
    const foodType =  req.body.foodType;
    const foodCategory =  req.body.foodCategory;
    const numberOfDucks =  req.body.numberOfDucks;
    const foodQuantity =  req.body.foodQuantity;

    const scheduledFeedInfo = {
        username,
        feedTime,
        feedLocation,
        foodType,
        foodCategory,
        numberOfDucks,
        foodQuantity
    };
    const newSchedule = new Schedule({username,scheduled});

    newSchedule.save()
    .then( () => res.json('job scheduled!'))
    .catch(err =>res.status(400).json('Error : '+ err));
    
    let scheduleList = scheduleHelper.getSchedulingQueue();
    if(scheduleList.findIndex(entry => entry.username == username)!==-1){
      let index = scheduleList.findIndex(entry => entry.username == username);
    scheduleList[index] = scheduledFeedInfo;
    }else{  
        scheduleList.push(scheduledFeedInfo);      
    //scheduleList.push({scheduledFeedInfo.username:{scheduledFeedInfo}});
    }
    
    //save the helper variable
    scheduleHelper.setSchedulingQueue(scheduleList);
})


module.exports = router;