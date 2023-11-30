export type UserType = {
  id?: number;
  username?: string;
  nickname?: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  // 性别 0 男 1 女
  gender?: number;
  // 状态 0 正常 1封号
  status?: number;
  createTime?: Date;
  // 角色 0 - 普通用户 1 - 管理员
  role?: number;
  // 星球编号
  planetCode?: string;
  // 标签
  tags?: string | string[];
  // 个人介绍
  introduction?: string;
};

export type TeamType = {
  id?: number;
  userId?: number;
  name?: string;
  description?: string;
  maxNum?: number;
  status?: number;
  expireTime?: string;
  createTime?: Date;
  updateTime?: Date;
  createUser?: UserType;
  password?: string;
  users?: number[];
};
