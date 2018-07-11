import React, { Component } from 'react';
import UploadForm from '../components/upload';
import Uploading from '../components/uploading';
import _ from 'lodash';

class Home extends Component {

    state = {
        component: 'UploadForm',
        data: null,
        uploadEvent: null
    }
    /**
     * Dynamic render the upload state, splited by components
     * Perform the Uploading component to show progress bar
     * **/
    renderComponent = () => {

        const {component, data, uploadEvent} = this.state;

        switch (component) {
            case 'Uploading':
                return <Uploading cancel={() => {

                    this.setState({
                        uploadEvent: null,
                        data: null,
                        component: 'UploadForm'
                    })

                }} event={uploadEvent} data={data}/>

            default:
                return <UploadForm
                    uploadEvent = {(event) => {
                        console.log('Upload event', event);
                        let data = this.state.data;
                        if(_.get(event, 'type') === 'success' ) {
                            data = _.get(event, 'payload');
                        }
                        this.setState({
                            data: data,
                            uploadEvent: event,
                            component: (_.get(event, 'type') === 'success') ? 'UploadSent' : this.state.component,
                        })
                    }}
                    uploadStart={(data) => {
                        console.log('Upload start');
                        this.setState({
                            data: data,
                            component: 'Uploading',
                        });
                    }}/>

        }
    }

    render() {
        return (
            <div className={'samba-app-container'}>
                <div className={'samba-app-content'}>
                    {this.renderComponent()}
                </div>
            </div>
        );
    }
}

export default Home;