import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { FilesService } from '../files/files.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private userRepo: typeof User,
  private readonly fileService: FilesService,
  private readonly jwtService: JwtService,
  ){}


  async registration(createUserDto: CreateUserDto) {
    
    const user = await this.findOneByEmail(createUserDto.email);

    if(user){
      throw new BadRequestException('Email already used');
    }


    if(createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(createUserDto.password,7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password: hashed_password,
    })

    const token = await this.generateToken(newUser)

    const hashed_token = await bcrypt.hash(token, 7)

    const updateUser = await this.userRepo.update({
      hashed_token: hashed_token,
    }, {where:{id: newUser.id}, returning: true});

    return {user: newUser.nickname, token}; 
  }
  
  async login(loginUserDto: LoginUserDto){
    const {email, password} = loginUserDto;
    
    const user = await this.userRepo.findOne({where:{email}, include: {all: true}});
    if(!user) {
      throw new HttpException('user not found!!', HttpStatus.NOT_FOUND)
    }

    const isMatchPass = await bcrypt.compare(password, user.hashed_password)
    if(!isMatchPass) {
      throw new BadRequestException('login or password not correct!!!');
    }

    const tokens = await this.generateToken(user)

    const hashed_token = await bcrypt.hash(tokens, 7)

    const updatedUser = await this.userRepo.update({
      hashed_token: hashed_token},
     {where: {id: user.id}, returning: true}
    )

    return { user: user.nickname, tokens};
  }

  findAll() {
    return this.userRepo.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.userRepo.findByPk(id, {include:{all:true}});
  }

  findOneByEmail(email: string) {
    return this.userRepo.findOne({where: {email}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(updateUserDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.userRepo.destroy({where:{id}});
  }


  private async generateToken(user: User){
    const jwtPayload = { id: user.id, isAdmin: user.isActive };
    const accessToken = await this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      })
  

    return accessToken
  

  }

}
