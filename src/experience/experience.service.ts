import { Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Experience } from './models/experience.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ExperienceService {

  constructor(@InjectModel(Experience) private experienceRepo: typeof Experience){}

  create(createExperienceDto: CreateExperienceDto) {
    return this.experienceRepo.create(createExperienceDto);
  }

  findAll() {
    return this.experienceRepo.findAll();
  }

  findOne(id: number) {
    return this.experienceRepo.findByPk(id);
  }

  update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return this.experienceRepo.update(updateExperienceDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.experienceRepo.destroy({where: {id}});
  }
}
