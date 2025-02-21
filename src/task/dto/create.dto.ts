import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsArray,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class CreateDtoTask {
  @ApiProperty({
    description: 'User associated with the social media account',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  user: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Post a new update on Twitter',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Due date for the task',
    example: '2025-02-21T00:00:00Z',
  })
  @IsString()
  dueDate: Date;

  @ApiProperty({
    description: 'The status of the task (pending, completed, overdue)',
    example: 'pending',
    enum: ['pending', 'completed', 'overdue'],
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'List of associated social media accounts for the task',
    example: ['603c72ef191f6f001f8c1a1a', '603c72ef191f6f001f8c1a1b'],
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  socialMedia: mongoose.Schema.Types.ObjectId[];
}
