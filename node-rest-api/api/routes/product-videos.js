const express = require('express');
const router = express.Router();
const Zencoder = require('zencoder');
const s3Config = require('../../config');

let zenClient = Zencoder(s3Config.zenCoderKey);

/**External request using Zencoder Package
 * Get all jobs from Zencoder
 * **/
router.get('/', (req, res, next) => {
    console.log('Gettiong Jobs...')
    zenClient.Job.list((response, data) => {
        res.status(200).json({
            data: data
        });
    })
});

/**External request using Zencoder Package
 * Get specific Job by ID from Zencoder
 * **/
router.get('/:videoId', (req, res, next) => {
    const id = req.params.videoId;
    zenClient.Job.details(id, (response, data) => {
        res.status(200).json({
            data: data
        });
    })
});

module.exports = router;