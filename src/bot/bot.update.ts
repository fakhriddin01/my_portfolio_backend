import {Start, Update, Ctx, On} from 'nestjs-telegraf'
import { BotService } from './bot.service';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
    constructor(private readonly botService: BotService){}
}