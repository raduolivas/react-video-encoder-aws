import React, { Component } from 'react';

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
        this.state = {videos: {data:[]}}
    }

    async  componentDidMount() {
        let videos = [];
        VideosDataStorage(this.param).then(videos => {
            this.loading = false;
            this.setState({videos});
            console.log('NEW STATE', this.state)
        });
    }

    videoClicked = (index) => {
        console.log('Video clicked: ', index);
    }

    render() {
        const videoList = this.state.videos.data.map((vd, index) => {
            return <Video video={vd} key={index} clicked={() => this.videoClicked(vd.job.id)} />;
        });
        return (
            <div className={'samba-videos-container'}>
                {this.loading && <img className="loading" src={loadingImage} />}
                {videoList}
            </div>
        )
    }

}

export default Videos;