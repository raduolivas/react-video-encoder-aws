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
            <div className={'samba-app-card samba-app-card-uploading'}>
                <div className={'samba-app-card-content'}>
                    <div className={'samba-app-card-content-inner'}>
                        <div className={'samba-app-home-uploading'}>

                            <div className={'samba-app-home-uploading-icon'}>
                                <img src={loadingImage} />
                            </div>

                            <div className={'samba-app-upload-files-total'}>Uploading {totalFiles} files.</div>

                            <div className={'samba-app-form-actions'}>
                                <button onClick={() => {
                                    if(this.props.cancel){
                                        this.props.cancel(true)
                                    }
                                }} className={'samba-app-upload-cancel-button samba-app-button'} type={'button'}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Uploading;

