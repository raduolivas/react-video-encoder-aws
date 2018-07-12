const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const s3Config = require('../../config');

/**AWS S3 Set up
 * **/
AWS.config.update(s3Config.s3Config);

const s3 = new AWS.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'samba-challenge-videos',
        metadata: function (req, file, cb) {
            cb(null, Object.assign({file: file.originalname},req.body));
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

router.post('/', upload.array('file', 10),(req, res, next) => {
    var file = req.files;
    console.log('=======')
    console.log(file);
    console.log('=====');
    // console.log(req.body);

    res.status(200).json({
        message: 'Video uploaded Successfully'
    });
});

module.exports = router;