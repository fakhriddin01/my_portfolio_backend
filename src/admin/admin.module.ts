import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';

@Module({
  imports:[SequelizeModule.forFeature([Admin]),
  JwtModule.register({
    
  }),
  FilesModule,
],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
