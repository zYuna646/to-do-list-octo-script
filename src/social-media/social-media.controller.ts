import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller'; // Assuming BaseController provides basic CRUD functionality
import { SocialMedia } from 'src/common/schemas/social-media.schema';
import { SocialMediaService } from './social-media.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions/permissions.guard';
import { CreateDtoSocialMedia } from './dto/create.dto';
import { UpdateDtoSocialMedia } from './dto/update.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Permission } from 'src/common/decorators/permissions.decorator';
import { BaseResponse } from 'src/common/base/base.response';
import { Task } from 'src/common/schemas/task.schema';

@Controller('social-media')
@ApiBearerAuth()
export class SocialMediaController extends BaseController<SocialMedia> {
  constructor(protected readonly SocialMediaService: SocialMediaService) {
    super(SocialMediaService);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new social-media' })
  @ApiBody({ type: CreateDtoSocialMedia })
  @ApiResponse({
    status: 201,
    description: 'The social-media has been successfully created.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: BaseResponse,
  })
  @Permission('POST')
  async create(
    @Body() createDto: CreateDtoSocialMedia,
  ): Promise<BaseResponse<SocialMedia>> {
    return this.SocialMediaService.create(createDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get()
  @ApiOperation({ summary: 'Get all social-medias' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all social-medias.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No social-medias found.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: BaseResponse,
  })
  @Permission('GET')
  async findAll(): Promise<BaseResponse<SocialMedia[]>> {
    return this.SocialMediaService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a social-media by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the social-media.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No social-media found with the given ID.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: BaseResponse,
  })
  @Permission('GET')
  async findById(@Param('id') id: string): Promise<BaseResponse<SocialMedia>> {
    return this.SocialMediaService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a social-media by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateDtoSocialMedia })
  @ApiResponse({
    status: 200,
    description: 'The social-media has been successfully updated.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No social-media found with the given ID.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: BaseResponse,
  })
  @Permission('PUT')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDtoSocialMedia,
  ): Promise<BaseResponse<SocialMedia>> {
    return this.SocialMediaService.update(id, updateDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a social-media by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'The social-media has been successfully deleted.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No social-media found with the given ID.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: BaseResponse,
  })
  @Permission('DELETE')
  async softDelete(
    @Param('id') id: string,
  ): Promise<BaseResponse<SocialMedia>> {
    return this.SocialMediaService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get(':id/task')
  @ApiOperation({ summary: 'Get a social media task by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the user.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: BaseResponse,
  })
  @Permission('GET')
  async getTask(@Param('id') id: string): Promise<BaseResponse<Task[]>> {
    return this.SocialMediaService.getTask(id);
  }
}
