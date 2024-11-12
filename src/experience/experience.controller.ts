import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { IsAdminGuard } from '../guards/isAdmin.guard';



@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @UseGuards(IsAdminGuard)
  @Post()
  create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experienceService.create(createExperienceDto);
  }

  @Get()
  findAll() {
    return this.experienceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experienceService.findOne(+id);
  }

  @UseGuards(IsAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto) {
    return this.experienceService.update(+id, updateExperienceDto);
  }

  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienceService.remove(+id);
  }
}
