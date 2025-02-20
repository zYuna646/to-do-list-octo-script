import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateDtoSocialMedia {
  @IsString()
  name: string;
}
