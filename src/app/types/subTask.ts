import { UpdatedAtCreatedAt } from './commons/commons';

export type SubTaskInfo = UpdatedAtCreatedAt & {
  _id: string;
  todoId: string;
  name: string;
  isDone: boolean;
  order: number;
};
