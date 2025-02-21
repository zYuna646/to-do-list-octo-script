import { BaseSchema } from 'src/common/base/base.schema';
import mongoose, { Document } from 'mongoose';
import { SocialMediaPost } from './social-media-post.schema';

const TaskSchemaDefinition = {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'overdue'],
    default: 'pending',
  },
  socialMedia: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'SocialMedia',
    required: true,
  },
};

const PopulateDefinition = [
  { path: 'user' },
  { path: 'socialMedia' },
  { path: 'SocialMediaPosts' },
];

export const TaskSchema = new BaseSchema(
  TaskSchemaDefinition,
  PopulateDefinition,
);

TaskSchema.virtual('SocialMediaPosts', {
  ref: 'SocialMediaPost',
  localField: '_id',
  foreignField: 'task',
  justOne: false,
});

TaskSchema.pre('save', async function (next) {
  if (this.dueDate && new Date(this.dueDate as Date) < new Date()) {
    this.status = 'overdue';
  }

  this.updatedAt = new Date();
  next();
});

export interface Task extends Document {
  user: string;
  description: string;
  dueDate: Date;
  status: string;
  socialMedia: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  setCompleted(): Promise<Task>;
  getPost(): Promise<SocialMediaPost[]>;
}

TaskSchema.methods.setCompleted = async function (): Promise<Task> {
  this.status = 'completed';
  return await this.save();
};

TaskSchema.methods.getPost = async function (): Promise<SocialMediaPost[]> {
  return this.SocialMediaPosts;
};
