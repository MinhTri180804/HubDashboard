import { TaskStateConstantsValues } from '../constants/todoStateConstants';
import { UpdatedAtCreatedAt } from './commons/commons';
import { EmployeeInfo } from './employee';
import { SubTaskInfo } from './subTask';
import { TagInfo } from './tag';

export type TaskInfo = UpdatedAtCreatedAt & {
  _id: string;
  name: string;
  deadline: number;
  state: TaskStateConstantsValues;
  tagIds: TagInfo[];
  doneAt: number;
  subTasks: SubTaskInfo[];
  assignedTo: EmployeeInfo;
  createdBy: EmployeeInfo;
};
