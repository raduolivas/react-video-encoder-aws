const express = require('express');
const s3 =  require('./s3-config.json');

const s3Config = {
    accessKeyId: s3.accessKeyId,
    secretAccessKey: s3.secretAccessKey
};

const s3Region = 'us-east-2 ';
const s3Bucket = 'samba-challenge-videos';

module.exports = s3Config, s3Region, s3Bucket;