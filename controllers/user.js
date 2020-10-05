const USERSSS = require("../models/userSchema");
const taskss = require("../models/taskSchema");
var mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectID;
module.exports.add = function (req, res) {
  let request = req.body;

  if (request.username != null || request.username != "") {
    USERSSS.findOne({ UserName: request.username }, (err, user) => {
      if (user == null) {
        var newUser = new USERSSS({
          UserName: req.body.username,
          TaskTitle: req.body.tasktitle,
        });
        newUser.save((err, user) => {
          if (err) throw err;
          console.log(user);
        });
        console.log(req.body.firstname);
        res.status(200).send("User Added");
      } else {
        res.status(300).send("User Already Exists");
      }
    });
  } else {
    response.status(400).send("user not added");
  }
};

module.exports.getUsers = function (req, res) {
  USERSSS.find({}, function (err, results) {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
};

module.exports.assignTask = function (req, res) {
  var task = req.body;
  USERSSS.findOne({ UserName: task.UserName }, function (err, doc1) {
    var myquery = { title: task.TaskTitle };
    taskss.findOne({ title: task.TaskTitle }, function (err, doc2) {
      var objectId = mongoose.Types.ObjectId(doc2._id);
      // doc1.TaskTitle = `ObjectId("${doc2._id}")`;
      // 
      doc1.TaskTitle=objectId;
      doc1.save();
    });
  });
  res.status(201).send("Task assigned");
};

module.exports.getAssignedTasks = function (req, res) {
  USERSSS.aggregate([
    { $lookup:
       {
         from: 'tasks',
         localField: {'$toObjectId':'TaskTitle'},
         foreignField: '_id',
         as: 'userTasks'
       }
     }
    ]).exec((err, locations) => {
      if (err) throw err;
      console.log(locations);
  })
};