const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const s3Config = require('../../config');

/**AWS S3 Set up
 * **/
AWS.config.update(s3Config.s3Access);

const s3 = new AWS.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: s3Config.s3Bucket,
        metadata: function (req, file, cb) {
            cb(null, {file: file.originalname});
        },
        key: function (req, file, cb) {
            cb(null, 'inputs/' + file.originalname)
        }
    })
})

/**@Post Request
 * Request to upload video to S3 Bucket
 * **/
router.post('/', upload.array('file', 10),(req, res, next) => {
    var file = req.files;
    console.log('=' * 20);
    console.log(file);
    res.status(200).json({
        message: 'Video Uploaded Successfully'
    });
});

module.exports = router;