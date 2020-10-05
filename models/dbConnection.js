const mongoose = require("mongoose");
const CONNECTION_URL = "mongodb://localhost/taskdb";
var db = mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    throw error;
  }
  console.log("Connected to database");
});
module.exports=db;