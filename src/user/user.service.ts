import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';
import { User } from 'src/common/schemas/user.schema';
import { HttpStatus } from '@nestjs/common';
import { BaseResponse } from 'src/common/base/base.response';
import { SocialMedia } from 'src/common/schemas/social-media.schema';
import { Task } from 'src/common/schemas/task.schema';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectModel('User') private userModel: Model<User>) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async getSocialMedia(id: string): Promise<BaseResponse<SocialMedia[]>> {
    try {
      const entity = await this.userModel.findOne({ _id: id }).exec();
      if (!entity) {
        return new BaseResponse<SocialMedia[]>(
          HttpStatus.NOT_FOUND,
          'Entity not found',
          null,
        );
      }
      return new BaseResponse<SocialMedia[]>(
        HttpStatus.OK,
        'Entity fetched successfully',
        await entity.getSocialMedia(),
      );
    } catch (error) {
      return new BaseResponse<SocialMedia[]>(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error fetching entity',
        null,
        error.message,
      );
    }
  }

  async getTask(id: string): Promise<BaseResponse<Task[]>> {
    try {
      const entity = await this.userModel.findOne({ _id: id }).exec();
      if (!entity) {
        return new BaseResponse<Task[]>(
          HttpStatus.NOT_FOUND,
          'Entity not found',
          null,
        );
      }
      return new BaseResponse<Task[]>(
        HttpStatus.OK,
        'Entity fetched successfully',
        await entity.getTask(),
      );
    } catch (error) {
      return new BaseResponse<Task[]>(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error fetching entity',
        null,
        error.message,
      );
    }
  }
}
