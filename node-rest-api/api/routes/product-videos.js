const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /videos'
    });
});

router.get('/:videoId', (req, res, next) => {
    const id = req.params.videoId;
    if (id === '9999-video') {
        res.status(200).json({
            message: 'This is de 9999-video-ID',
            id: id
        });
    } else {
        res.status(200).json({
           message: 'You passed an ID'
        })
    }

});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST request to /videos'
    });
});

module.exports = router;