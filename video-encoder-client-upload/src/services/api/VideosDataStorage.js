import axios from 'axios';
import { apiUrl } from "../../config";

export const VideosDataStorage = (param) => {

   let url = param ? `${apiUrl}/` + param : `${apiUrl}`;

    return axios.get(url).then((response) => {
        return response.data;

    }).catch((err) => {
        return err;
    })



}

export default VideosDataStorage;