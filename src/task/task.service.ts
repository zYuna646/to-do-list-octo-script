import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/common/schemas/task.schema';
import { Model } from 'mongoose';
import { BaseResponse } from 'src/common/base/base.response';
import { HttpStatus } from '@nestjs/common';
import { SocialMediaPost } from 'src/common/schemas/social-media-post.schema';

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(@InjectModel('Task') private TaskModel: Model<Task>) {
    super(TaskModel);
  }

  async setCompleted(id: string): Promise<BaseResponse<Task>> {
    try {
      const entity = await this.TaskModel.findOne({ _id: id }).exec();
      if (!entity) {
        return new BaseResponse<Task>(
          HttpStatus.NOT_FOUND,
          'Entity not found',
          null,
        );
      }
      return new BaseResponse<Task>(
        HttpStatus.OK,
        'Entity set completed successfully',
        await entity.setCompleted(),
      );
    } catch (error) {
      return new BaseResponse<Task>(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error fetching entity',
        null,
        error.message,
      );
    }
  }

  async getPost(id: string): Promise<BaseResponse<SocialMediaPost[]>> {
    try {
      const entity = await this.TaskModel.findOne({ _id: id }).exec();
      if (!entity) {
        return new BaseResponse<SocialMediaPost[]>(
          HttpStatus.NOT_FOUND,
          'Entity not found',
          null,
        );
      }
      return new BaseResponse<SocialMediaPost[]>(
        HttpStatus.OK,
        'Entity fetched successfully',
        await entity.getPost(),
      );
    } catch (error) {
      return new BaseResponse<SocialMediaPost[]>(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error fetching entity',
        null,
        error.message,
      );
    }
  }
}
