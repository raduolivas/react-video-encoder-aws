import React, { Component } from 'react';

import UploadForm from '../components/upload';
import Uploading from '../components/uploading';
import UploadSent from '../components/uploaded';

import Videos from '../components/videos';

import _ from 'lodash';

class Home extends Component {

    constructor(props) {

        super(props);

        this.state = {
            componentName: 'HomeForm',
            data: null,
            uploadEvent: null,
        };


        this.renderUploadComponent = this.renderUploadComponent.bind(this)

    }
    /**
     * Dynamic render the upload state, splited by components
     * Perform the Uploading component to show progress bar
     * **/
    renderUploadComponent = () => {

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
            case 'UploadSent':
                return(
                    <UploadSent sendAnotherFile={() => {

                        this.setState({
                            uploadEvent: null,
                            data: null,
                            component: 'UploadForm'
                        })

                    }} data={data}/>
                )
            default:
                return <UploadForm
                    uploadEvent = {(event) => {
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
                        this.setState({
                            data: data,
                            component: 'Uploading',
                        });
                    }}/>

        }
    }

    render() {
        return (
            <div className={'encoder-app-container'}>
                <div className={'encoder-app-content'}>
                    {this.renderUploadComponent()}
                    <Videos />
                </div>
            </div>
        );
    }
}

export default Home;