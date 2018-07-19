import React, {Component} from 'react';
import _ from 'lodash';
import loadingImage from '../../img/loading.gif';

class Uploading extends Component {

    /*
    * Init Uploading component for uploading progress status
    * This component is rendered while upload is in progress
    * */

    state = {
        data: null
    }

    componentDidMount() {

        const {data} = this.props;
        /** Updating State with dynamic data from /pages/home **/
        this.setState({
            data: data
        });

    }

    render() {

        const { data } = this.state;
        const totalFiles = _.get(data, 'files', []).length;

        return (
            <div className={'encoder-app-card encoder-app-card-uploading'}>
                <div className={'encoder-app-card-content'}>
                    <div className={'encoder-app-card-content-inner'}>
                        <div className={'encoder-app-home-uploading'}>

                            <div className={'encoder-app-home-uploading-icon'}>
                                <img src={loadingImage} />
                            </div>

                            <div className={'encoder-app-upload-files-total'}>Uploading {totalFiles} files.</div>

                            <div className={'encoder-app-form-actions'}>
                                <button onClick={() => {
                                    if(this.props.cancel){
                                        this.props.cancel(true)
                                    }
                                }} className={'encoder-app-upload-cancel-button encoder-app-button'} type={'button'}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Uploading;

