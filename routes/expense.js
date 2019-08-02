const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  database: 'moneyManagerApp'
});

const connection = pool

router.get('/expenses', (req, res) =>{
  console.log("accessing expense logs");
  connection.query("SELECT * FROM expenses", (err,rows,fields) => {
    res.json(rows);
  })
});


module.exports = router
