import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectModule } from './project/project.module';
import { Admin } from './admin/models/admin.model';
import { Project } from './project/models/project.model';
import { ContactModule } from './contact/contact.module';
import { SkillModule } from './skill/skill.module';
import { LanguageModule } from './language/language.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';
import { Skill } from './skill/models/skill.model';
import { Language } from './language/models/language.model';
import { Experience } from './experience/models/experience.model';
import { Education } from './education/models/education.model';
import { Contact } from './contact/models/contact.model';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import {join} from 'path'
import { BotModule } from './bot/bot.module';
import { BOT_NAME } from './app.constants';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: ()=>({
          token: process.env.BOT_TOKEN,
          middlewares: [],
          include: [BotModule]
      })
  }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Admin, Project, Skill, Language, Experience, Education, Contact],
      autoLoadModels: true,
      logging: false
  }),
    AdminModule,
    ProjectModule,
    ContactModule,
    SkillModule,
    LanguageModule,
    ExperienceModule,
    EducationModule,
    UserModule,
    PostModule,
    CommentModule,
    BotModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
