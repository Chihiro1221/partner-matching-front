import { http } from '../utils/request';
import { TeamType } from '../types/models';
import { PageData } from '../types/types';

/**
 * 创建队伍
 * @param body
 */
export const createTeam = (body: TeamType) => {
  return http.request<TeamType[]>({
    url: '/team',
    method: 'POST',
    data: body,
  });
};

/**
 * 更新队伍
 * @param body
 */
export const updateTeam = (body: TeamType) => {
  return http.request<TeamType[]>({
    url: `/team/${body.id}`,
    method: 'PUT',
    data: body,
  });
};

interface GetTeamParams {
  // 队伍id
  id?: number;
  // 创建人id
  userId?: number;
  // 队伍名
  name?: string;
  // 队伍描述
  description?: string;
}
/**
 * 获取队伍列表
 */
export const getTeamList = (params: GetTeamParams) => {
  return http.request<PageData<TeamType>>({
    url: '/team',
    params,
  });
};

/**
 * 获取自己创建的队伍
 * @param userId 创建人id
 * @returns
 */
export const getCreatedTeamList = () => {
  return http.request<TeamType[]>({
    url: '/team/created',
  });
};

/**
 * 获取已加入的队伍
 * @param userId 创建人id
 * @returns
 */
export const getJointedTeamList = () => {
  return http.request<TeamType[]>({
    url: '/team/jointed',
  });
};

/**
 * 根据id获取队伍
 * @param teamId
 * @returns
 */
export const getTeamById = (teamId: number) => {
  return http.request<TeamType>({
    url: `/team/${teamId}`,
  });
};

interface JoinTeamParams {
  teamId: number;
  password?: string;
}

/**
 * 加入队伍
 * @param body
 */
export const joinTeam = (body: JoinTeamParams) => {
  return http.request<PageData<TeamType>>({
    url: '/team/join',
    method: 'POST',
    data: body,
  });
};

/**
 * 解散队伍
 * @param teamId
 * @returns
 */
export const dissolveTeam = (teamId: number) => {
  return http.request({
    url: `/team/${teamId}`,
    method: 'DELETE',
  });
};

/**
 * 退出队伍
 * @param teamId
 * @returns
 */
export const quitTeam = (teamId: number) => {
  return http.request({
    url: `/team/quit/${teamId}`,
    method: 'POST',
  });
};
