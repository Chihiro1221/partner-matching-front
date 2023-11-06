import {http} from '../utils/request.ts';
import {User} from '../types/models';

/**
 * 根据标签获取用户
 * @param tagNameList
 */
export const getUserByTags = (tagNameList: string) => {
    return http.request<User[]>({
        url: '/user/search',
        params: {
            tagNameList,
        },
    });
};

export interface UserLogin {
    username: string;
    password: string;
}

/**
 * 用户登录
 * @param data
 * @returns
 */
export const login = (data: UserLogin) => {
    return http.request({
        url: '/user/login',
        method: 'post',
        data,
    });
};

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return http.request({
        url: '/user/current',
    });
};

/**
 * 修改用户信息
 * @param user
 */
export const changeUserInfo = (user: User) => {
    return http.request({
        method: 'put',
        url: '/user/update',
        data: user
    });
};