import { TodoStateConstantsValues } from '../constants/todoStateConstants';
import { UpdatedAtCreatedAt } from './commons/commons';
import { EmployeeInfo } from './employee';
import { SubTodoInfo } from './subTodo';
import { TagInfo } from './tag';

export type TodoInfo = UpdatedAtCreatedAt & {
  id: string;
  name: string;
  deadline: number;
  state: TodoStateConstantsValues;
  tags: TagInfo[];
  doneAt: Date | null;
  subTodos: SubTodoInfo[];
  assignedTo: EmployeeInfo;
  createdBy: EmployeeInfo;
};
