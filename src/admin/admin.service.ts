import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminService {

  constructor(@InjectModel(Admin) private adminRepo: typeof Admin,
  private readonly fileService: FilesService,
  private readonly jwtService: JwtService,
  ){}

  async registration(createAdminDto: CreateAdminDto) {
   
    if(createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password,7);
    const newUser = await this.adminRepo.create({
      ...createAdminDto,
      hashed_password: hashed_password,
    })

    const token = await this.generateToken(newUser)

    const hashed_token = await bcrypt.hash(token, 7)

    const updateUser = await this.adminRepo.update({
      hashed_token: hashed_token,
    }, {where:{id: newUser.id}, returning: true});

    return {admin: newUser.first_name, token}; 
  }

  async login(loginUserDto: LoginAdminDto){
    const {email, password} = loginUserDto;
    
    const user = await this.adminRepo.findOne({where:{email}, include: {all: true}});
    if(!user) {
      throw new HttpException('admin not found!!', HttpStatus.NOT_FOUND)
    }

    const isMatchPass = await bcrypt.compare(password, user.hashed_password)
    if(!isMatchPass) {
      throw new BadRequestException('login or password not correct!!!');
    }

    const tokens = await this.generateToken(user)

    const hashed_token = await bcrypt.hash(tokens, 7)

    const updatedUser = await this.adminRepo.update({
      hashed_token: hashed_token},
     {where: {id: user.id}, returning: true}
    )

    return { admin: user.first_name, tokens};
  }

  findAll() {
    return this.adminRepo.findAll();
  }
    
  findOne(id: number) {
    return this.adminRepo.findByPk(id);
  }

  update(id: number, updateUserDto: UpdateAdminDto) {
    return this.adminRepo.update(updateUserDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

    
  private async generateToken(user: Admin){
    const jwtPayload = { id: user.id, isAdmin: user.isAdmin };
    const accessToken = await this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      })
  

    return accessToken
  

  }
}
