import axios from 'axios';

const dogInstance = axios.create({
    baseURL: 'https://api.thedogapi.com/v1/'
});

const catInstance = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/'
})

export {
    dogInstance,
    catInstance
};