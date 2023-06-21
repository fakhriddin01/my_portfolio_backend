import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contact } from './models/contact.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Contact]),
  JwtModule.register({
    
  }),
  ],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
