import { PageData } from '../types/types';
import { http } from '../utils/request';
import { UserType } from '../types/models';
import { PageParams } from '../types/types';

/**
 * 根据标签获取用户
 * @param tagNameList
 */
export const getUserByTags = (tagNameList: string) => {
  return http.request<UserType[]>({
    url: '/user/search',
    params: {
      tagNameList,
    },
  });
};

/**
 * 获取推荐用户
 *
 */
export const getRecommends = (params: PageParams) => {
  return http.request<PageData<UserType>>({
    url: '/user/recommend',
    params,
  });
};

/**
 * 获取匹配用户
 *
 */
export const getMatchUsers = (num: number) => {
  return http.request<UserType[]>({
    url: '/user/match',
    params: { num },
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
  return http.request<UserType>({
    url: '/user/current',
  });
};

/**
 * 修改用户信息
 * @param user
 */
export const changeUserInfo = (user: UserType) => {
  return http.request({
    method: 'put',
    url: '/user/update',
    data: user,
  });
};
