import Axios from './Axios';

// const isDev = import.meta.env.DEV;
const http = new Axios({baseURL: '/user-match/api' , withCredentials: true});

export {http};
