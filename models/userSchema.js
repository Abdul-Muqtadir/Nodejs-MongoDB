var mongoose =require('mongoose');
var userSchema=new mongoose.Schema({
    UserName:{
        type:String
    },
    TaskTitle:{
        type:mongoose.Types.ObjectId
    },
});
var model=mongoose.model('users',userSchema);
module.exports=model;