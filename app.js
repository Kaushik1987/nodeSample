const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var sqlite3 = require("sqlite3").verbose();
var users = require("./routes/users");
require("dotenv").config();
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Welcome to Day1 traning Clarionites!"));

app.use(function(req, res, next) {
  // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`");
  // console.log("req.params", req.params);
  // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`");
  // console.log("req.body", req.body);
  // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`");
  // console.log("req.query", req.query);
  // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`");
  var db = new sqlite3.Database("./users");
  db.run("CREATE TABLE IF NOT EXISTS users (userId INTEGER, name TEXT)");
  req.db = db;
  req.tempStore = {};
  req.tempStore.responseObject = {};
  req.tempStore.data = { test: "hi" };
  req.tempStore.status = 200;
  next();
});

app.use("/users", users);

app.use("/static", express.static("public"));

app.listen(process.env.PORT, () => console.log("listening on port 3002!"));
