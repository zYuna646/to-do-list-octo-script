import { BaseSchema } from 'src/common/base/base.schema';
import mongoose, { Document } from 'mongoose';

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

const PopulateDefinition = {};

export const TaskSchema = new BaseSchema(
  TaskSchemaDefinition,
  PopulateDefinition,
);

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
}

TaskSchema.methods.setCompleted = async function (): Promise<Task> {
  this.status = 'completed';
  return this.save();
};
