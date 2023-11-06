import Axios from './Axios';

const http = new Axios({baseURL: 'http://localhost:8080', timeout: 10000, withCredentials: true});

export {http};
