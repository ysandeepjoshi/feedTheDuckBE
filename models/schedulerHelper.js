
var _schedulingQueue = [];
const getSchedulingQueue = function(){
    return _schedulingQueue;
};
const setSchedulingQueue = function(schedules){
    _schedulingQueue = schedules
}
module.exports = {
    getSchedulingQueue,
    setSchedulingQueue
}