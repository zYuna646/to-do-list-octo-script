import { Module } from '@nestjs/common';
import { SocialMediaController } from './social-media.controller';
import { SocialMediaService } from './social-media.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialMediaSchema } from 'src/common/schemas/social-media.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SocialMedia', schema: SocialMediaSchema },
    ]),
  ],
  controllers: [SocialMediaController],
  providers: [SocialMediaService],
})
export class SocialMediaModule {}
