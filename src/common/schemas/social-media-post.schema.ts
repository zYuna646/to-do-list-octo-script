import { BaseSchema } from 'src/common/base/base.schema';
import mongoose, { Document } from 'mongoose';
import slugify from 'slugify';
import { Task } from './task.schema';

const SocialMediaPostSchemaDefinition = {
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  postContent: { type: String, required: true },
  postStatus: {
    type: String,
    enum: ['pending', 'posted'],
    default: 'pending',
  },
  postedAt: { type: Date, require: false },
};

const PopulateDefinition = { path: 'task' };

export const SocialMediaPostSchema = new BaseSchema(
  SocialMediaPostSchemaDefinition,
  PopulateDefinition,
);

SocialMediaPostSchema.pre('save', function (next) {
  if (this.postStatus === 'posted') {
    this.postedAt = new Date();
  }
  this.updatedAt = new Date();
  next();
});

export interface SocialMediaPost extends Document {
  task: mongoose.Schema.Types.ObjectId;
  postContent: string;
  postStatus: string;
  createdAt: Date;
  updatedAt: Date;
  getTask(): Promise<Task>;
  setPosted(): Promise<SocialMediaPost>;
}

SocialMediaPostSchema.methods.getTask = async function (): Promise<Task> {
  return this.task;
};

SocialMediaPostSchema.methods.setPosted =
  async function (): Promise<SocialMediaPost> {
    this.postStatus = 'posted';
    return await this.save();
  };
