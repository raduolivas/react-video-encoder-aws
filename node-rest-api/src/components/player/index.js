import React, { Component } from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import VideosDataStorage from '../../services/api/VideosDataStorage';
import loadingImage from '../../img/loading_vds.gif';
import 'react-html5video/dist/styles.css';

import './Player.css';

class VideoPlayer extends Component  {

    constructor(props) {
        super(props);
        this.state = {video: {}, isLoaded:false};
        this.param = props.match.params.id;
        this.loading = true;
    }

    /**Datasource request
     * Get Video By it's ID
     * **/
    async componentDidMount() {
        VideosDataStorage(this.param).then(video => {
            this.loading = false;
            let isLoaded = true
            this.setState({video: video});
            this.setState({isLoaded: isLoaded});
        });
    }

    goback = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>

                {this.loading && <img className="loading" src={loadingImage} />}
                {this.state.isLoaded &&
                    <div>
                        <h2 className={'encoder-video-title'}>{this.state.video.data.job.output_media_files[0].label}</h2>
                        <div onClick={this.goback} className={'encoder-goback-btn'}><span>GO BACK</span></div>
                        <Video autoPlay loop muted
                           controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                           poster=""
                           onCanPlayThrough={() => {
                               // Do stuff
                           }}>

                        <source src={this.state.video.data.job.output_media_files[0].url} type="video/mp4"/>
                        <track label="English" kind="subtitles" srcLang="en" src="" default/>
                    </Video>
                    </div>
            }
            </div>

        );
    }
}

export default VideoPlayer;