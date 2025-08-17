import { TodoStateConstantsValues } from '../constants/todoStateConstants';
import { UpdatedAtCreatedAt } from './commons/commons';
import { EmployeeInfo } from './employee';
import { SubTodoInfo } from './subTodo';
import { TagInfo } from './tag';

export type TodoInfo = UpdatedAtCreatedAt & {
  _id: string;
  name: string;
  deadline: number;
  state: TodoStateConstantsValues;
  tagIds: TagInfo[];
  doneAt: number;
  subTodos: SubTodoInfo[];
  assignedTo: EmployeeInfo;
  createdBy: EmployeeInfo;
};
