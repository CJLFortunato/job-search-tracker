import { Types } from 'mongoose';

export interface Tag {
  user: Types.ObjectId,
  label: string,
  applications: Types.ObjectId[],
}
