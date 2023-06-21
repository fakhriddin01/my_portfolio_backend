import { Injectable } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Education } from './models/education.model';

@Injectable()
export class EducationService {

  constructor(@InjectModel(Education) private educationRepo: typeof Education){}

  create(createEducationDto: CreateEducationDto) {
    return this.educationRepo.create(createEducationDto);
  }

  findAll() {
    return this.educationRepo.findAll();
  }

  findOne(id: number) {
    return this.educationRepo.findByPk(id);
  }

  update(id: number, updateEducationDto: UpdateEducationDto) {
    return this.educationRepo.update(updateEducationDto, {where:{id}, returning:true});
  }

  remove(id: number) {
    return this.educationRepo.destroy({where:{id}});
  }
}
