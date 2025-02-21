import {
  IsString,
  IsMongoId,
  IsOptional,
  IsEnum,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class UpdateDtoSocialMediaPost {
  @ApiProperty({
    description: 'The content of the social media post',
    example: 'Updated content for the post.',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  postContent?: string;

  @ApiProperty({
    description: 'The status of the post',
    example: 'posted',
    enum: ['pending', 'posted'],
    required: false,
  })
  @IsEnum(['pending', 'posted'])
  @IsOptional()
  postStatus?: 'pending' | 'posted';
}
