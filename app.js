const Express = require("express");
const BodyParser = require("body-parser");
var app = Express();
var db=require('./models/dbConnection');
const addRoutes = require('./routes/index');
// var http = require("http");

// var port = process.env.PORT || 3000;
// app.set('port', port)
// var server = http.createServer(app);

app.use(BodyParser.json())
    app.use("/add", addRoutes);
    app.use("/get", addRoutes);
    app.use("/delete", addRoutes);
    app.use("/update", addRoutes);
    // app.get("/", require("./routes/index"));

module.exports = app;
