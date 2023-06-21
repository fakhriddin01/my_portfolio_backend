import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Skill } from './models/skill.model';

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill) private readonly skillRepo: typeof Skill){}

  create(createSkillDto: CreateSkillDto) {
    return this.skillRepo.create(createSkillDto);
  }

  findAll() {
    return this.skillRepo.findAll();
  }

  findOne(id: number) {
    return this.skillRepo.findByPk(id, {include: {all:true}});;
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return this.skillRepo.update(updateSkillDto, {where:{id}, returning: true});
  }

  remove(id: number) {
    return this.skillRepo.destroy({where: {id}});

  }
}
