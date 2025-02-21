import { BaseSchema } from 'src/common/base/base.schema';
import mongoose, { Document } from 'mongoose';
import { Task } from './task.schema';

const SocialMediaSchemaDefinition = {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  platform: {
    type: String,
    enum: ['facebook', 'twitter', 'instagram'],
    required: true,
  },
  accountId: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String },
};

const PopulateDefinition = { path: 'user' };

export const SocialMediaSchema = new BaseSchema(
  SocialMediaSchemaDefinition,
  PopulateDefinition,
);

SocialMediaSchema.virtual('Tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'socialMedia',
  justOne: false,
});

SocialMediaSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export interface SocialMedia extends Document {
  user: string;
  platform: string;
  accountId: string;
  accessToken: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  getTask(): Promise<Task[]>;
}
SocialMediaSchema.methods.getTask = async function (): Promise<Task[]> {
  return this.Tasks;
};
