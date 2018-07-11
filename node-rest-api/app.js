const express = require('express');
const multer = require('multer');
const app = express();

const videosRoutes = require('./api/routes/product-videos');
const videoRoutesUpload = require('./api/routes/upload');

const s3Config = require('./config');

app.use('/videos', videosRoutes);
app.use('/videos/upload', videoRoutesUpload);

module.exports = app;