## Samba Challenge Video Ecoder with React.js and Node.js ( NODE SERVER API )

This node Server is handling the Multipart Upload to AWS S3 Bucket

How to run:
1. Clone the repo and `cd` into the directory
2. `npm install`
3. `npm run dev` to start it locally
4. Add you AWS API keys in s3-config.json file
5. cd into node-rest-api and 'node server.js' open (it will run a server on `http://localhost:3001`)
7. cd into video-encoder-frontend-app and npm start (it will start the client on `http://localhost:3000`)
8. upload your videos

## API

### File information

Each file contains the following information:

PATH | Description | Note
--- | --- | ---
`/videos` | Fetch all videos | videos with status
`/videos/:videosId` | Fetch specific video by ID | video player

