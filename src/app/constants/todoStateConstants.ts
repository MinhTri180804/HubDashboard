export const TodoStateConstants = {
  TODO: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
};

export type TodoStateConstantsKeys = keyof typeof TodoStateConstants;
export type TodoStateConstantsValues =
  (typeof TodoStateConstants)[TodoStateConstantsKeys];
