import React,{Component} from 'react'
import './Uploaded.css';
import _ from 'lodash';

const UploadSent = (props) =>{

        const {data} = props;
        console.log("Data", data);
        const postId = _.get(data, '_id');

        return (
            <div className={'samba-app-card app-card-upload-sent'}>

                <div className={'samba-app-card-content'}>
                    <div className={'samba-app-card-content-inner'}>

                        <div className={'samba-app-home-uploading'}>

                            <div className={'samba-app-home-upload-sent-icon'}>

                                    VIDEO SENT
                            </div>

                            <div className={'samba-app-upload-sent-actions samba-app-form-actions'}>
                                <button onClick={()=> {

                                    if(props.sendAnotherFile){
                                        props.sendAnotherFile(true);
                                    }
                                }} className={'samba-app-button'} type={'button'}>Send another file</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
}

export default UploadSent;