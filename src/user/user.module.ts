import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';
import { Comment } from '../comment/models/comment.model';

@Module({
  imports:[SequelizeModule.forFeature([User, Comment]),
  JwtModule.register({
    
  }),
  FilesModule,
],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
