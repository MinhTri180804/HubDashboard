export type ResponseSuccess<T> = T;

export type ResponseError<T> = T;

export type UpdatedAtCreatedAt = {
  updatedAt: number;
  createdAt: number;
};

export type Pagination = {
  currentPage: number;
  pageSize: number;
  totalItem: 19;
  totalPage: 3;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
