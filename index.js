//load app server
const express = require('express');
const app = express();
const port = process.env.PORT ||  7890;
const mysql = require('mysql');
const cors = require('cors');
// const firebase = require('firebase/database');
const router = require('./routes/expense.js');
app.use(router);

app.use(express.static(__dirname + '/public'));

const path = __dirname;

app.get('/', (req, res) =>{
  console.log("running firebase front end");
  res.sendFile(__dirname + "/views/index.html")
});

app.listen(port, () => {
  console.log("server is up and listening on " + port);
});
