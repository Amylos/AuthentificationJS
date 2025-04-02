require('dotenv').config();
const express = require('express');
const mysql = require('./config/mysql.js');
const connectDB = require('./config/mongo.js');
const authRoutes = require('./routes/auth.routes.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

connectDB();
const app = express();
const port = process.env.SERVER_PORT;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/', authRoutes);

// EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/home', (req, res) => {
 res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
res.render('register');
});

app.listen(port, ()=>{
    console.log(`App running on port : ${port} `);
});

