import { TaskStateConstantsValues } from '../../constants/todoStateConstants';

export type CreateTaskRequestBody = {
  name: string;
  assignedTo: string;
  createdBy: string;
  deadline: number;
  state: TaskStateConstantsValues;
  tagIds: string[];
};
