const express = require('express');
const multer = require('multer');
const app = express();

const videosRoutes = require('./api/routes/product-videos');

const s3Config = require('./config');

app.use('/videos', videosRoutes);

module.exports = app;