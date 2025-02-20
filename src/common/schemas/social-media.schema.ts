import { BaseSchema } from 'src/common/base/base.schema';
import mongoose, { Document } from 'mongoose';

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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

const PopulateDefinition = { path: 'user' };

export const SocialMediaSchema = new BaseSchema(
  SocialMediaSchemaDefinition,
  PopulateDefinition,
);

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
}
