require('dotenv').config();

/**AWS S3 Configuration and Access parameters
 * **/
const S3_ACCESS_CONFIG = {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
    region: process.env.S3_REGION
};

const S3_BUCKET = process.env.S3_BUCKET;

/**ZENCODER Access Parameters
 * **/
const ZENCODER_KEY = process.env.ZENCODER_KEY;
console.log('=++++++++++++[   NODEJS [-] S3 [-] ZENCODER [-] API ]+++++++++++++=');

module.exports = Object.freeze({
    s3Access : S3_ACCESS_CONFIG,
    s3Region : process.env.S3_REGION,
    s3Bucket: S3_BUCKET,
    zenCoderKey: ZENCODER_KEY
});