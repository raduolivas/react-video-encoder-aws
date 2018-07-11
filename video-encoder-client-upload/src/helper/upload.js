import axios from 'axios';
import { apiUrl } from "../config";
import _ from 'lodash';

export const upload = (form, callback =() => {}) => {

    let data = new FormData();
    let files = _.get(form, 'files', []);

    _.each(files, (file) => {
        data.append('files', file);
    });

    data.append('title', _.get(form, 'title'));

    const config = {
        uploadProgress: (event) => {
            console.log("Upload event", event);

            return callback({
                type: 'uploadProgress',
                payload: event
            });
        }
    }

    const url = `${apiUrl}/upload`;
    console.log('This is the form', data);
    axios.post(url, data, config).then((response) => {
        //Upload response

        return callback({
            type: 'success',
            payload: response.data
        })
    }).catch((err) => {
        return callback({
            type: 'error',
            payload: err
        })
    })
}