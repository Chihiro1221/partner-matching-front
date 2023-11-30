import Axios from './Axios';

const isDev = import.meta.env.DEV;
const http = new Axios({baseURL: isDev ? 'http://localhost:8080' : '/user-match/api/', withCredentials: true});

export {http};
