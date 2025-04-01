const express = require('express');
const mysql = require('./config/mysql.js')
require('dotenv').config();

const authRoutes = require('../src/routes/auth.routes.js');

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

app.use('/', authRoutes);

app.listen(port, ()=>{
    console.log("APP RUNNING ON port : htp://localhost:" + port);
});

