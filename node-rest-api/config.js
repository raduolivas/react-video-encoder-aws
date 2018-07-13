const express = require('express');
const s3 =  require('./s3-config.json');

/**AWS S3 Configuration and Access parameters
 * **/
const S3_ACCESS_CONFIG = {
    accessKeyId: s3.accessKeyId,
    secretAccessKey: s3.secretAccessKey,
    region: s3.region
};

const S3_BUCKET = 'samba-challenge-videos';

/**ZENCODER Access Parameters
 * **/
const ZENCODER_KEY = '2e3c6249b58d83d2e25a8b09ce1703ea';

module.exports = Object.freeze({
    s3Access : S3_ACCESS_CONFIG,
    s3Region : s3.region,
    s3Bucket: S3_BUCKET,
    zenCoderKey: ZENCODER_KEY
});