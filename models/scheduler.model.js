const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    username:{type:String, required:true},
    scheduled:{type:Boolean,required:true}
},{
    timestamps:true,
});


const Schedule =  mongoose.model('Schedule',scheduleSchema);

module.exports = Schedule;