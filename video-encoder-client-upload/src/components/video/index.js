import React from 'react';
import ThumbVideo from'../../img/no_thumb.png';
import './Video.css';

const Video = (props) => {
    const video = props.video;
    const thumbUrl = video.job.thumbnails[0] ? video.job.thumbnails[0].url : ThumbVideo;
    const label = video.job.output_media_files[0].label ? video.job.output_media_files[0].label : "";  /**some videos has no label**/

    return (
        <div className={'encoder-item-video'} onClick={props.clicked}>
            <div className={'encoder-video-thumb'}><img src={thumbUrl} alt={'Video image'}/></div>
            <div className={'encoder-video-status'}><span>Name: {label.substring(0, 15)}...</span></div>
            <div className={'encoder-video-status'}><span>Encode: {video.job.state}</span></div>
        </div>
    )
}

export default Video;
