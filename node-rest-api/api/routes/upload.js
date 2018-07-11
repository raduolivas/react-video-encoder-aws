const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/uploads/'});

router.post('/', upload.array('file', 10),(req, res, next) => {
    var file = req.files;
    console.log('=======')
    console.log(file);
    console.log('=====');
    console.log(req.body);
    res.status(200).json({
        message: 'Handling POST UPLOAD to /videos'
    });
});

module.exports = router;