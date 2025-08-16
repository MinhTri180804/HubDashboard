import { StateTodoEnum } from '../enums/stateTodoEnum';
import { EmployeeInfo } from './employee';
import { TagInfo } from './tag';

export type TodoInfo = {
  id: string;
  name: string;
  by: EmployeeInfo;
  deadline: Date;
  state: StateTodoEnum;
  tags: TagInfo[];
  doneAt: Date | null;
  createdAt: Date;
  subTodo: {
    id: string;
    name: string;
    isDone: boolean;
  }[];
};
