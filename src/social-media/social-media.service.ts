import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { SocialMedia } from 'src/common/schemas/social-media.schema';
import { Model } from 'mongoose';

@Injectable()
export class SocialMediaService extends BaseService<SocialMedia> {
  constructor(
    @InjectModel('SocialMedia') private SocialMediaModel: Model<SocialMedia>,
  ) {
    super(SocialMediaModel);
  }
}
