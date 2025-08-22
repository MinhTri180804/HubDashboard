import { TaskStateConstantsValues } from '../constants/todoStateConstants';
import { UpdatedAtCreatedAt } from './commons/commons';
import { EmployeeInfo } from './employee';
import { SubTaskInfo } from './subTask';
import { TagInfo } from './tag';
import { TaskStateInfo } from './taskState';

export type TaskInfo = UpdatedAtCreatedAt & {
  _id: string;
  name: string;
  deadline: number;
  state: TaskStateInfo;
  tagIds: TagInfo[];
  doneAt: number;
  subTodos: SubTaskInfo[];
  assignedTo: EmployeeInfo;
  createdBy: EmployeeInfo;
};
