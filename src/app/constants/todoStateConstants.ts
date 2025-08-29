export const TaskStateConstants = {
  TODO: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
};

export type TaskStateConstantsKeys = keyof typeof TaskStateConstants;
export type TaskStateConstantsValues =
  (typeof TaskStateConstants)[TaskStateConstantsKeys];
