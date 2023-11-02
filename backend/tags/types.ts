import { Types } from 'mongoose';

export interface Tag {
  _id?: Types.ObjectId,
  user: Types.ObjectId,
  label: string,
  applications: Types.ObjectId[],
}
