import React, {Component} from 'react';
import _ from 'lodash';
class Uploading extends Component {

    /*
    * Init Uploading component for uploading progress status
    * This component is rendered while upload is in progress
    * */

    state = {
        data: null,
        loaded: 0,
        total: 0,
        percentage: 10
    }

    componentDidMount() {
        const {data} = this.props;
        /** Updating State with dinamic data from /pages/home **/
        this.setState({
            data: data
        });
    }

    componentWillReceiveProps(nextProps){
        const {event} = nextProps;

        switch(_.get(event, 'type')) {
            case 'uploadProgress':
                const loaded = _.get(event, 'payload.loaded', 0);
                const total = _.get(event, 'payload.total');
                const percentage = total !== 0 ? (loaded/total) * 100 : 0;

                this.setState({
                    loaded: loaded,
                    total: total,
                    percentage:percentage
                });

                break;
            default:

                break
        }
    }
    render() {

        const {percentage, data, total, loaded } = this.state;
        const totalFiles = _.get(data, 'files', []).length;

        return (
            <div className={'samba-app-card samba-app-card-uploading'}>
                <div className={'samba-app-card-content'}>
                    <div className={'samba-app-card-content-inner'}>
                        <div className={'samba-app-home-uploading'}>

                            <div className={'samba-app-home-uploading-icon'}>
                                <h2>Sending...</h2>
                            </div>

                            <div className={'samba-app-upload-files-total'}>Uploading {totalFiles} files.</div>

                            <div className={'samba-app-progress'}>
                                <span style={{width: `${percentage}%`}} className={'samba-app-progress-bar'} />
                            </div>

                            <div className={'samba-app-upload-stats'}>
                                <div className={'samba-app-upload-stats-left'}>{loaded}/{total}</div>
                            </div>

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

