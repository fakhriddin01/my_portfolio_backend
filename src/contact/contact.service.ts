import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './models/contact.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact) private contactRepo: typeof Contact){}

  create(createContactDto: CreateContactDto) {
    return this.contactRepo.create(createContactDto);
  }

  findAll() {
    return this.contactRepo.findAll();
  }

  findOne(id: number) {
    return this.contactRepo.findByPk(id);
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return this.contactRepo.update(updateContactDto, {where:{id}, returning: true});
  }

  remove(id: number) {
    return this.contactRepo.destroy({where: {id}});
  }
}
