const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');

const connectDB = require('./config/db');

//Load Config
dotEnv.config({ path: "./config/config.env"})

//Database Connection
connectDB();

const app = express();

//BodyParser
app.use(bodyParser.urlencoded({extended: false}));

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3000;
try {
    app.listen(PORT || 3000);
    console.log(`server is running on port ${PORT}`);
} catch (err) {
    console.log(err);
}