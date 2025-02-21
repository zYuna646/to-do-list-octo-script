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

export class UpdateDtoTask {
  @ApiProperty({
    description: 'Updated description of the task',
    example: 'Post a new update on Twitter about the event',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Updated due date for the task',
    example: '2025-02-22T00:00:00Z',
    required: false,
  })
  @IsString()
  @IsOptional()
  dueDate?: Date;

  @ApiProperty({
    description: 'Updated status of the task',
    example: 'completed',
    enum: ['pending', 'completed', 'overdue'],
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'List of associated social media accounts for the task',
    example: ['603c72ef191f6f001f8c1a1a', '603c72ef191f6f001f8c1a1b'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  socialMedia?: mongoose.Schema.Types.ObjectId[];
}
