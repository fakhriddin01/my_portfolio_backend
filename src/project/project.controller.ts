import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IsAdminGuard } from '../guards/isAdmin.guard';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  
  @UseGuards(IsAdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createProjectDto: CreateProjectDto, @UploadedFile() file?: Express.Multer.File) {
    return this.projectService.create(createProjectDto);
  }
  
  @Get()
  findAll() {
    return this.projectService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }
  
  @UseGuards(IsAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }
  
  @UseGuards(IsAdminGuard)
  @Patch('/image/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.projectService.updateImage(+id, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
