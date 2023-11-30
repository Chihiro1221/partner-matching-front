export type PageParams = {
  pageNum: int;
  pageSize: int;
};

export type Response<T> = {
  code: number;
  message: string;
  data?: T;
};

export type PageData<T> = {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
};
