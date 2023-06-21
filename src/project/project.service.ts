import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './models/project.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';

@Injectable()
export class ProjectService {

  constructor(
    @InjectModel(Project) private projectRepo: typeof Project,
    private readonly fileService: FilesService,

  ){}

  async create(createProjectDto: CreateProjectDto, file?: Express.Multer.File) {

    const newProject = await this.projectRepo.create({...createProjectDto});

    return newProject;
  }

  findAll() {
    return this.projectRepo.findAll();
  }

  async findOne(id: number) {
    const project = await this.projectRepo.findByPk(id, {include: {all:true}});

    if(!project){
      throw new HttpException('post with this id not found', HttpStatus.NOT_FOUND)
    }
    return project
  }

  async updateImage(id: number, file: Express.Multer.File) {
    
    const image = await this.fileService.createFile(file);

    return this.projectRepo.update({image: `${process.env.FILEPATH}/${image}`}, {where:{id}, returning: true});
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepo.update(updateProjectDto, {where:{id}, returning: true});
  }

  remove(id: number) {
    return this.projectRepo.destroy({where: {id}});
  }
}
