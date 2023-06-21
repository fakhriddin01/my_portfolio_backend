import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Education } from './models/education.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Education]),
  JwtModule.register({
    
  }),
],
  controllers: [EducationController],
  providers: [EducationService]
})
export class EducationModule {}
