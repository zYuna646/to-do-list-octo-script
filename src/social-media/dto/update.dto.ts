import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDtoSocialMedia {
  @ApiProperty({
    description: 'User associated with the social media account',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  user?: string;

  @ApiProperty({
    description: 'Platform name (facebook, twitter, instagram)',
    enum: ['facebook', 'twitter', 'instagram'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['facebook', 'twitter', 'instagram'])
  platform?: string;

  @ApiProperty({
    description: 'Account ID from the social media platform',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  accountId?: string;

  @ApiProperty({
    description: 'Access token to interact with the platform’s API',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  accessToken?: string;

  @ApiProperty({
    description: 'Optional refresh token',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
