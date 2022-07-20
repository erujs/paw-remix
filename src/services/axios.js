import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/'
});

export default instance;