const express = require("express");
const dba = require("./dbAccess.js");
let db = dba.connect();
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});

// 1
app.get("/api/messages", function (req, res) {
  dba.readMessages(db, req, res);
});

// 2 / 12
app.post("/api/messages", function (req, res) {
  console.log(req.body);
  dba.addMessage(db, req.body.msg, req.body.uname);
});

// 3
app.get("/api/users/:user/messages", function (req, res) {
  dba.readUserMessages(db, req, res);
});

// 4
app.post("/api/admin/scrap", function (req, res) {
  console.log(req.body.apassword)
  if (req.body.apassword === "password") {
   
    dba.scrap(db);
  }
});

// 5 / 11
app.get("/api/messages/:id", function (req, res) {
  console.log("hit on task 5 / 11");
  res.send({ error: "not yet implemented" });
});

// 6 / 13
app.patch("/api/messages/:id", function (req, res) {
  console.log("hit on task 6 / 13");
  res.send({ error: "not yet implemented" });
});

// 7 / 14
app.delete("/api/messages/:id", function (req, res) {
  console.log("hit on task 7 / 14");
  res.send({ error: "not yet implemented" });
});

// 8
app.get("/api/users/", function (req, res) {
  console.log("hit on task 8");
  res.send({ error: "not yet implemented" });
});

// 9, 15
app.post("/api/users/create", function (req, res) {
  console.log("hit on task 9 / 15");
  res.send({ error: "not yet implemented" });
});

// 10, 16
app.put("/api/users/:user/setProfile", function (req, res) {
  console.log("hit on task 10 / 16");
  res.send({ error: "not yet implemented" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function close(db) {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Closing the database connection.");
  });
}
