import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateDtoSocialMedia {
  @IsString()
  name: string;
}
