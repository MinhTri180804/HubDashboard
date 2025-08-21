import { UpdatedAtCreatedAt } from './commons/commons';

export type TaskStateInfo = UpdatedAtCreatedAt & {
  _id: string;
  name: string;
  order: number;
};
