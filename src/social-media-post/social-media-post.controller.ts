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
import { SocialMediaPost } from 'src/common/schemas/social-media-post.schema';
import { SocialMediaPostService } from './social-media-post.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions/permissions.guard';
import { CreateDtoSocialMediaPost } from './dto/create.dto';
import { UpdateDtoSocialMediaPost } from './dto/update.dto';
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

@Controller('social-media-post')
@ApiBearerAuth()
export class SocialMediaPostController extends BaseController<SocialMediaPost> {
  constructor(
    protected readonly SocialMediaPostService: SocialMediaPostService,
  ) {
    super(SocialMediaPostService);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new social-media-post' })
  @ApiBody({ type: CreateDtoSocialMediaPost })
  @ApiResponse({
    status: 201,
    description: 'The social-media-post has been successfully created.',
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
    @Body() createDto: CreateDtoSocialMediaPost,
  ): Promise<BaseResponse<SocialMediaPost>> {
    return this.SocialMediaPostService.create(createDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get()
  @ApiOperation({ summary: 'Get all social-media-posts' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all social-media-posts.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No social-media-posts found.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: BaseResponse,
  })
  @Permission('GET')
  async findAll(): Promise<BaseResponse<SocialMediaPost[]>> {
    return this.SocialMediaPostService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a social-media-post by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the social-media-post.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No social-media-post found with the given ID.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: BaseResponse,
  })
  @Permission('GET')
  async findById(
    @Param('id') id: string,
  ): Promise<BaseResponse<SocialMediaPost>> {
    return this.SocialMediaPostService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a social-media-post by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateDtoSocialMediaPost })
  @ApiResponse({
    status: 200,
    description: 'The social-media-post has been successfully updated.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No social-media-post found with the given ID.',
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
    @Body() updateDto: UpdateDtoSocialMediaPost,
  ): Promise<BaseResponse<SocialMediaPost>> {
    return this.SocialMediaPostService.update(id, updateDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a social-media-post by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'The social-media-post has been successfully deleted.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No social-media-post found with the given ID.',
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
  ): Promise<BaseResponse<SocialMediaPost>> {
    return this.SocialMediaPostService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a social-media-post task by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the social-media-post task.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No social-media-post found with the given ID.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: BaseResponse,
  })
  @Permission('GET')
  async getTask(@Param('id') id: string): Promise<BaseResponse<Task>> {
    return this.SocialMediaPostService.getTask(id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get(':id/posted')
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
  async setPosted(
    @Param('id') id: string,
  ): Promise<BaseResponse<SocialMediaPost>> {
    return this.SocialMediaPostService.setPosted(id);
  }
}
