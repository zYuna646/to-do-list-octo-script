import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { SocialMedia } from 'src/common/schemas/social-media.schema';
import { Model } from 'mongoose';
import { BaseResponse } from 'src/common/base/base.response';
import { Task } from 'src/common/schemas/task.schema';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class SocialMediaService extends BaseService<SocialMedia> {
  constructor(
    @InjectModel('SocialMedia') private SocialMediaModel: Model<SocialMedia>,
  ) {
    super(SocialMediaModel);
  }

  async getTask(id: string): Promise<BaseResponse<Task[]>> {
    try {
      const entity = await this.SocialMediaModel.findOne({ _id: id }).exec();
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
