import axios from 'axios';

const instance = axios.create({
    baseURL:"https://gentle-lowlands-27678.herokuapp.com"
})

export default instance;