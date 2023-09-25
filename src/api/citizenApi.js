import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { URL } = getEnvVariables();

const citizenApi = axios.create({
    baseURL: URL
});

citizenApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default citizenApi;