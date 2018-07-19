import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import VideosDataStorage from '../../services/api/VideosDataStorage';
import loadingImage from '../../img/loading_vds.gif';
import './Videos.css';
import videosMock from '../../mocks/videos-mock-obj.json';

import Video from  '../video';

class Videos extends Component {

    constructor(props) {
        super(props);
        this.loading = true;
        this.param = null;
        this.state = {videos: {data:[]}};
    }

    async  componentDidMount() {
        VideosDataStorage(this.param).then(videos => {
            this.loading = false;
            this.setState({videos});
        });
    }

    videoClicked = (index) => {
        console.log('Video clicked: ', index);
    }

    render() {
        const videoList = this.state.videos.data.map((vd, index) => {
            return <Link to={`/video/${vd.job.id}`}><Video video={vd} key={index} clicked={() => this.videoClicked(vd.job.id)} /></Link>;
        });
        return (
            <div className={'encoder-videos-container'}>
                <div className={'encoder-videos'}>
                    {this.loading && <img className="loading" src={loadingImage} />}
                    {videoList}
                </div>
            </div>
        )
    }

}

export default Videos;