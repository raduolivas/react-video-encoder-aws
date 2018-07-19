# -*- coding: utf-8 -*-

from __future__ import absolute_import, print_function

import logging
import base64
import json
import shutil
import urllib
import uuid
from urllib.parse import urlencode
import os
import boto3


logger = logging.getLogger('zencoder_lambda')
logger.setLevel(logging.INFO)
logger.info('lambda :: initialized.')

s3 = boto3.client('s3')

API_URL = 'https://app.zencoder.com/api/v2/jobs'
API_KEY = '2e3c6249b58d83d2e25a8b09ce1703ea'
INPUT_FOLDER_NAME = 'inputs/'
S3_OUTPUT_BASE_URL = 's3://videos-encoder-nodejs-virginia/outputs'
NOTIFICATION_EMAIL = 'rodolfoslv@gmail.com'

def _build_api_data(b, k):
    # Get the bucket name
    input_bucket = b

    # Get object key and convert pluses
    input_key = k

    print('input_key', k)

    # Strip input folder name and file extension from input key to create output key
    input_filename = input_key.replace(INPUT_FOLDER_NAME, '', 1)
    output_key = os.path.splitext(input_filename)[0]
    filename = output_key + ".mp4"

    # Zencoder API request data
    api_data = {
        "input": "s3://" + input_bucket + "/" + input_key,
        "notifications": NOTIFICATION_EMAIL,
        "outputs": [
            {
              "label": filename,
              "url": "s3://videos-encoder-nodejs-virginia/outputs/"+filename,
              "h264_profile": "high",
              "public": True,
              "thumbnails": [
                {
                    "format": "png",
                    "width": 130,
                    "height": 80,
                    "aspect_mode": "crop",
                    "base_url": S3_OUTPUT_BASE_URL,
                    "label": "_thumb_sm",
                    "filename": output_key + "_{{number}}_{{width}}x{{height}}-thumbnail",
                    "public": True
                },
                {
                    "format": "png",
                    "size": "400x300",
                    "aspect_mode": "crop",
                    "base_url": S3_OUTPUT_BASE_URL,
                    "label": "_thumb_lg",
                    "filename": output_key + "_{{number}}_{{width}}x{{height}}-thumbnail",
                    "public": True
                }

              ]
            }
        ]
    }
    return api_data
    
def lambda_handler(event, context):
    try:
        bucket = event['Records'][0]['s3']['bucket']['name']
        key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')

        logger.info(bucket)
        logger.info(key)
        # Send request to Zencoder API
        data = json.dumps(_build_api_data(bucket, key)).encode('ascii')
        
        logger.info(data)
        
        # Headers for Zencoder request
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Zencoder-Api-Key': API_KEY
        }
    
        _request = urllib.request.Request(API_URL, data, headers)
        response = urllib.request.urlopen(_request)
        
        logger.info(response)

        # Log the response
        print("API RESPONSE:")
        print(response.read())

    except Exception as e:
        print(e)
        print('Error submitting job for {} from S3 bucket {}.'.format(key, bucket))
        raise e