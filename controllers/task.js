const taskss = require("../models/taskSchema");
const userss = require("../models/userSchema");
module.exports.addTask = function (req, res) {
  let request = req.body;
  if (
    (request.title != null || request.title != "") &&
    (request.description != null || request.description != "")
  ) {
    taskss.findOne({ title: request.title }, (err, task) => {
      if (task == null) {
        var newTask = new taskss({
          title: request.title,
          description: request.description,
        });
        newTask.save((err, task) => {
          if (err) throw err;
          console.log(task);
        });
        console.log(req.body.firstname);
        res.status(200).send("1 task added");
      } else {
        res.status(300).send("task already exists");
      }
    });
  } else {
    response.status(400).send("task not added");
  }
};

module.exports.getTasks = function (req, res) {
  taskss.find({}, function (err, results) {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
};

module.exports.removeTask = function (req, res) {
  var myquery = { _id: req.body.id };
  taskss.deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    userss.findOne( { TaskTitle: req.body.id }, function (err, doc){
        doc.TaskTitle = "n";
        doc.save();
      });
    res.status(201).send("Task Deleted");
    console.log("1 document deleted");
  });
};

module.exports.updateTask = function (req, res) {
  var task = req.body;
  if (
    (task.oldtitle != null || task.oldtitle != "") &&
    (task.newtitle != null || task.newtitle != "") &&
    (task.description != null || task.description != "")
  ) {
    taskss.find({title:task.newtitle}, function (err, results) {
        if (err) throw err;
        if(results.length===0){
            console.log('rs');
            //var myquery = { title: req.body.oldtitle };
            // taskss.update(myquery, {$set:
            //  { title: req.body.newtitle,
            //   description: req.body.description,}
            // });
            taskss.findOne({ title: task.oldtitle }, function (err, doc){
                doc.title = task.newtitle;
                doc.description=task.description;
                doc.save();
              });
            res.status(201).send("Task Updated");
            console.log("1 document updated");
        }else{
            response.status(300).send("task already exists");
        }
      });
 
  } else {
    response.status(400).send("task not updated");
  }
};
