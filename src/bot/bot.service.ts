import { Injectable } from '@nestjs/common';
import { CreateNewMessageDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from '../app.constants';
import { Telegraf, Context, Markup } from 'telegraf';

@Injectable()
export class BotService {

  constructor(
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
    
  ){}

  async sendMessage(createNewMessageDto: CreateNewMessageDto): Promise<boolean>{
    
    await this.bot.telegram.sendMessage(258030605, 'New message from: ' + createNewMessageDto.username + "; \n" + "email: " + createNewMessageDto.email + "; \n" + "Subject: " + createNewMessageDto.subject + "; \n" + "Message: " + createNewMessageDto.message);
    return true;
    
  }

 

  findAll() {
    return `This action returns all bot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bot`;
  }

  update(id: number, updateBotDto: UpdateBotDto) {
    return `This action updates a #${id} bot`;
  }

  remove(id: number) {
    return `This action removes a #${id} bot`;
  }
}
