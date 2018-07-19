import axios from 'axios';
import { apiUrl } from "../config";
import _ from 'lodash';

export const upload = (form, callback =() => {}) => {

    let data = new FormData();
    let files = _.get(form, 'files', []);

    _.each(files, (file) => {
        data.append('file', file);
    });

    const url = `${apiUrl}/upload`;

    axios.post(url, data).then((response) => {

        return callback({
            type: 'success',
            payload: response.data
        })

    }).catch((err) => {
        console.log('Error Uploading', err);
        return callback({
            type: 'error',
            payload: err
        })
    })
}