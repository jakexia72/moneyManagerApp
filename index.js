//load app server
const express = require('express');
const app = express();
const port = process.env.PORT ||  7890;
const mysql = require('mysql');
const cors = require('cors');

const router = require('./routes/expense.js');
app.use(router);

const path = __dirname;


app.listen(port, () => {
  console.log("server is up and listening on " + port);
});
