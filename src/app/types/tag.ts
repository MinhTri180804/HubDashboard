import { UpdatedAtCreatedAt } from './commons/commons';

export type TagInfo = UpdatedAtCreatedAt & {
  _id: string;
  name: string;
  color: string;
};
