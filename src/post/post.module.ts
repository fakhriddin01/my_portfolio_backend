import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { Comment } from '../comment/models/comment.model';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports:[SequelizeModule.forFeature([Post, Comment]),
  JwtModule.register({
    
  }),
  FilesModule,
  CommentModule,
],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
