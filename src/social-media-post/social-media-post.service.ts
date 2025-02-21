import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { SocialMediaPost } from 'src/common/schemas/social-media-post.schema';
import { Model } from 'mongoose';
import { BaseResponse } from 'src/common/base/base.response';
import { Task } from 'src/common/schemas/task.schema';

@Injectable()
export class SocialMediaPostService extends BaseService<SocialMediaPost> {
  constructor(
    @InjectModel('SocialMediaPost')
    private SocialMediaPostModel: Model<SocialMediaPost>,
  ) {
    super(SocialMediaPostModel);
  }

  async setPosted(id: string): Promise<BaseResponse<SocialMediaPost>> {
    try {
      const entity = await this.SocialMediaPostModel.findOne({
        _id: id,
      }).exec();
      if (!entity) {
        return new BaseResponse<SocialMediaPost>(
          HttpStatus.NOT_FOUND,
          'Entity not found',
          null,
        );
      }
      return new BaseResponse<SocialMediaPost>(
        HttpStatus.OK,
        'Entity fetched successfully',
        await entity.setPosted(),
      );
    } catch (error) {
      return new BaseResponse<SocialMediaPost>(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error fetching entity',
        null,
        error.message,
      );
    }
  }

  async getTask(id: string): Promise<BaseResponse<Task>> {
    try {
      const entity = await this.SocialMediaPostModel.findOne({
        _id: id,
      }).exec();
      if (!entity) {
        return new BaseResponse<Task>(
          HttpStatus.NOT_FOUND,
          'Entity not found',
          null,
        );
      }
      return new BaseResponse<Task>(
        HttpStatus.OK,
        'Entity fetched successfully',
        await entity.getTask(),
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
}
