import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './common/guards/permissions/permissions.guard';
import { TaskModule } from './task/task.module';
import { SocialMediaPostModule } from './social-media-post/social-media-post.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    RoleModule,
    UserModule,
    AuthModule,
    SocialMediaModule,
    TaskModule,
    SocialMediaPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
