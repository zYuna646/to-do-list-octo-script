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

export class CreateDtoSocialMediaPost {
  @ApiProperty({
    description: 'The task associated with the social media post',
    example: '603c72ef191f6f001f8c1a1a',
    type: String,
    required: true,
  })
  @IsMongoId()
  task: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    description: 'The content of the social media post',
    example: 'Exciting news! We are launching a new product!',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  postContent: string;

  @ApiProperty({
    description: 'The status of the post',
    example: 'pending',
    enum: ['pending', 'posted'],
    required: false,
  })
  @IsEnum(['pending', 'posted'])
  @IsOptional()
  postStatus: 'pending' | 'posted' = 'pending';
}
