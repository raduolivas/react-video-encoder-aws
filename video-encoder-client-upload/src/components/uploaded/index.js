import React from 'react'
import './Uploaded.css';

const UploadSent = (props) =>{

        return (
            <div className={'encoder-app-card app-card-upload-sent'}>

                <div className={'encoder-app-card-content'}>
                    <div className={'encoder-app-card-content-inner'}>
                        <div className={'encoder-app-home-uploading'}>

                            <div className={'encoder-app-home-upload-sent-icon'}>VIDEO SENT</div>
                            <div className={'encoder-app-upload-sent-actions encoder-app-form-actions'}>
                                <button onClick={()=> {

                                    if(props.sendAnotherFile){
                                        props.sendAnotherFile(true);
                                    }
                                }} className={'encoder-app-button'} type={'button'}>Send another file</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
}

export default UploadSent;