var mongoose =require('mongoose');
var taskSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
});
var model=mongoose.model('tasks',taskSchema);
module.exports=model;