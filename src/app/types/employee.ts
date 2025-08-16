import { UpdatedAtCreatedAt } from './commons/commons';

export type EmployeeInfo = UpdatedAtCreatedAt & {
  _id: string;
  fullName: string;
  avatar: string;
};
