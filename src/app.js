require('dotenv').config();
const express = require('express');
const mysql = require('./config/mysql.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const apiRoutes = require('./routes/api.routes.js');
const viewRoutes = require('./routes/view.routes.js');

const app = express();
const port = process.env.SERVER_PORT;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/api', apiRoutes);
app.use('/',viewRoutes);

app.listen(port, ()=>{
    console.log(`App running on port : ${port} `);
});

