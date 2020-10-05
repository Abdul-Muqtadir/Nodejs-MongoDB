var express = require('express');
var router = express.Router();
var userCtr= require('../controllers/user');
var taskCtr=require('../controllers/task');
router.get('/',(req,res)=>{
 res.send("hello")
});
//user routes
router.post('/addUser',userCtr.add);
router.get('/getUsers',userCtr.getUsers);
router.put('/assignTask',userCtr.assignTask);
router.get('/getAssignedTasks',userCtr.getAssignedTasks);
//task routes
router.post('/addTask',taskCtr.addTask);
router.get('/getTasks',taskCtr.getTasks);
router.delete('/removeTask',taskCtr.removeTask);
router.put('/updateTask',taskCtr.updateTask);
module.exports = router;