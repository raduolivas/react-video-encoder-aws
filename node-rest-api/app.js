const express = require('express');
const multer = require('multer');
const app = express();

const videosRoutes = require('./api/routes/product-videos');
const videoRoutesUpload = require('./api/routes/upload');

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin",'*')
    res.header("Access-Control-Allow-Headers",'Origin, X-Requestes-With, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    next();
})

app.use('/videos', videosRoutes);
app.use('/videos/upload', videoRoutesUpload);

module.exports = app;