import React, { Component } from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import './Upload.css';
import {upload} from "../../helper/upload";

class Upload extends Component {

    state = {
        form : {
            files:[]
        },
        errors: {
            files:null
        }
    }

    /**Dynamic form fields validations
     * **/
    formValidation = (fields =[], callback = () =>{}) => {

        let {form, errors} = this.state;

        const validations = {
            files: [
                {
                    errorMessage: 'File is required.',
                    isValid: () => {
                        return form.files.length;
                    }
                }
            ]
        }
        // console.log(fields);
        _.each(fields, (field) => {
            let fieldValidations = _.get(validations, field, []);
            errors[field] = null;
            _.each(fieldValidations, (fieldValidation) => {
                const isValid = fieldValidation.isValid();

                if (isValid === 0) {
                    errors[field] = fieldValidation.errorMessage;
                }
            });
        });

        this.setState({
            errors: errors
        }, () => {
            let isValid = true;
            _.each(errors, (err) => {
                if (err !== null) {
                    isValid = false;
                }
            })
            return callback(isValid);
        })
    }

    fileAddedHandler = (event) => {

        let files = _.get(this.state, 'form.files', []);

        _.each(_.get(event, 'target.files', []), (file) =>{
            files.push(file);
        })

        this.setState({
            form: {
                ...this.state.form,
                files: files
            }
        }, () => {
            /** form validation over all changes on state**/
            this.formValidation(['files'], (isValid) => {
                console.log('Form Validations...')
            });
        })
    }

    submitVideo = (event) => {
       event.preventDefault();

       this.formValidation(['files'], (isValid)=> {
           if (isValid) {
               const data = this.state.form;
               if (this.props.uploadStart) {
                    this.props.uploadStart(data);
               }
               upload(data, (event) =>{
                   if (this.props.uploadEvent) {
                       this.props.uploadEvent(event);
                   }
               })

           }
       })
    }

    removeFile = (key) => {
        let {files} = this.state.form;
        files.splice(key, 1);
        this.setState({
            form: {
                ...this.state.form,
                files: files
            }
        })
    }

    render() {
        const {form, errors} = this.state;
        const {files} = form;
        return (
            <div className={'samba-app-card'}>
                <form onSubmit={this.submitVideo}>
                    <div className={'samba-app-card-header'}>
                        <div className={'samba-app-card-header-inner'}>
                            {
                                files.length ?
                                    <div className={'samba-app-files-selected'}>
                                        {
                                            files.map((file, index) => {
                                                return (
                                                    <div key={index} className={'samba-app-files-selected-item'}>
                                                        <div className={'filename'}>{file.name.substring(0, 20)}</div>
                                                        <div className={'samba-app-file-remove'}>
                                                            <span onClick={() => this.removeFile(index)}
                                                            type={'button'} >X
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div> : null
                            }
                            <div className={classNames('samba-app-file-select-zone', {'error': _.get(this.errors, 'files')})}>
                                <label htmlFor={'file'}>
                                    <input onChange={this.fileAddedHandler} id={'file'} type="file" name="file" multiple={true}/>
                                    {
                                    files.length ? <span className={'samba-app-upload-description text-uppercase'}>Add more videos</span> :
                                    <span>
                                        <span className={'samba-app-upload-btn'}>Select a video to upload</span>
                                        <span className={'samba-app-upload-description'}>You can select multiples videos.</span>
                                    </span>
                                    }
                                </label>
                            </div>
                            <div className={'samba-app-form-actions'}>
                                {
                                    files.length ? <button type={'submit'} className={'samba-app-button primary'}>Upload to bucket</button> :null
                                }

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Upload