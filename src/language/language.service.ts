import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './models/language.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class LanguageService {
  constructor(@InjectModel(Language) private langRepo: typeof Language){}

  create(createLanguageDto: CreateLanguageDto) {
    return this.langRepo.create(createLanguageDto);
  }

  findAll() {
    return this.langRepo.findAll();
  }

  findOne(id: number) {
    return this.langRepo.findByPk(id);
  }

  update(id: number, updateLanguageDto: UpdateLanguageDto) {
    return this.langRepo.update(updateLanguageDto, {where:{id}, returning: true});
  }

  remove(id: number) {
    return this.langRepo.destroy({where: {id}});
  }
}
