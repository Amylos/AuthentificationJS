require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createConnection({
       host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });

db.connect((err) =>{
    if(err){
        console.error('Failed to connect with the DB')
    }
    console.log("connected to the DB")
})


module.exports = db;