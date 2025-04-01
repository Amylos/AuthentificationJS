require('dotenv').config();
const express = require('express');
const mysql = require('./config/mysql.js');
const connectDB = require('./config/mongo.js');

const authRoutes = require('../src/routes/auth.routes.js');

connectDB();
const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

app.use('/', authRoutes);

app.listen(port, ()=>{
    console.log(`App running on port : ${port} `);
});

