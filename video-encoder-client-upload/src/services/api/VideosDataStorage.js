import axios from 'axios';
import { apiUrl } from "../../config";

export const VideosDataStorage = (param) => {

   let url = param ? `${apiUrl}` + param : `${apiUrl}`;

    return axios.get(url).then((response) => {
        console.log('get videos response', response.data);
        return response.data;

    }).catch((err) => {
        console.log('Error while request', err);
        return err;
    })



}

export default VideosDataStorage;