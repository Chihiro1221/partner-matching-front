import {Response} from '../types/types';
import axios, {AxiosRequestConfig} from 'axios';

export default class Axios {
    private instance;

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config);
        this.interceptors();
    }

    public request<T, D = Response<T>>(config: AxiosRequestConfig) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.instance.request<D>(config);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        }) as Promise<D>;
    }

    private interceptors() {
        this.requestInterceptor();
        this.responseInterceptor();
    }

    private requestInterceptor() {
        this.instance.interceptors.request.use(
            config => {
                // config.headers = {
                //     Authorization: `Bearer ${utils.store.get(cacheEnum.TOKEN_NAME)?.token}`,
                // };
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    private responseInterceptor() {
        this.instance.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                // console.log(location)
                // if(error.response.status === 401){
                //     location.href = `/user/login?redirect=${location.pathname}`
                // }
                // switch (error.response?.code) {
                //     case 401:
                //         utils.store.remove(cacheEnum.TOKEN_NAME);
                //         void router.push({name: 'login'});
                //         break;
                //     // 后台表单验证失败
                //     case 422:
                //         errorStore().errors = {};
                //         break;
                // }
                return Promise.reject(error);
            }
        );
    }
}
