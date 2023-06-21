import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { FilesService } from '../files/files.service';
import { UpdatePostStatusDto } from './dto/update-post-status.dto';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class PostService {

  constructor(
    @InjectModel(Post) private postRepo: typeof Post,
    private readonly fileService: FilesService,
    private readonly commentService: CommentService
    ){}

  async create(createPostDto: CreatePostDto) {

    createPostDto.content = await this.fileService.saveImage(createPostDto.content);  
    return this.postRepo.create(createPostDto);
  }

  findAll() {
    return this.postRepo.findAll({include:{all:true}});
  }


  findAllActive() {
    return this.postRepo.findAll({where:{isActive:true},include:{all:true}});
  }
  

  findOne(id: number) {
    return this.postRepo.findByPk(id,{include:{all:true}});
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepo.update(updatePostDto, {where: {id}, returning: true});
  }

  updateStatus(id: number, updatePostDto: UpdatePostStatusDto) {
    return this.postRepo.update(updatePostDto, {where: {id}, returning: true});
  }

  async remove(id: number) {
    await this.commentService.removePost(id);
    return this.postRepo.destroy({where:{id},cascade:true});
  }
}
