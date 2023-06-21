import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './models/comment.model';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateCommentStatusDto } from './dto/update-comment-status.dto';

@Injectable()
export class CommentService {

  constructor(@InjectModel(Comment) private commentRepo: typeof Comment){}

  create(createCommentDto: CreateCommentDto) {
    return this.commentRepo.create(createCommentDto);
  }

  findAll() {
    return this.commentRepo.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.commentRepo.findByPk(id, {include:{all:true}});
  }

  findAllForPost(post_id: number) {
    return this.commentRepo.findAll({where:{post_id, isAllowed: true}, include:{all:true}});
  }

  findAllFalse() {
    return this.commentRepo.findAll({where:{isAllowed: false}, include:{all:true}});
  }

  updateStatus(id: number, updateCommentStatusDto: UpdateCommentStatusDto) {
    return this.commentRepo.update(updateCommentStatusDto, {where:{id}, returning: true});
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepo.update(updateCommentDto, {where:{id}, returning: true});
  }

  remove(id: number) {
    return this.commentRepo.destroy({where:{id}});
  }

  removePost(id: number) {
    return this.commentRepo.destroy({where:{post_id: id}});
  }
}
