import { TodoStateConstantsValues } from '../../constants/todoStateConstants';

export type CreateTodoRequestBody = {
  name: string;
  assignedTo: string;
  createdBy: string;
  deadline: number;
  state: TodoStateConstantsValues;
  tagIds: string[];
};
