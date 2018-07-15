import React from 'react';
import ThumbVideo from'../../img/no_thumb.png';
import './Video.css';

const Video = (props) => {
    const video = props.video;
    const thumbUrl = video.job.thumbnails[0] ? video.job.thumbnails[0].url : ThumbVideo;
    const videoName = 'Video Name';
    return (
        <div className={'samba-item-video'} onClick={props.clicked}>
            <div className={'samba-video-thumb'}><img src={thumbUrl} /></div>
            <div className={'samba-video-status'}><span>Name: {videoName}</span></div>
            <div className={'samba-video-status'}><span>Encode: {video.job.state}</span></div>
        </div>
    )
}

export default Video;
