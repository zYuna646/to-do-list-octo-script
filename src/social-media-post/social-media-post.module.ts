import { Module } from '@nestjs/common';
import { SocialMediaPostController } from './social-media-post.controller';
import { SocialMediaPostService } from './social-media-post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialMediaPostSchema } from 'src/common/schemas/social-media-post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SocialMediaPost', schema: SocialMediaPostSchema },
    ]),
  ],
  controllers: [SocialMediaPostController],
  providers: [SocialMediaPostService],
})
export class SocialMediaPostModule {}
