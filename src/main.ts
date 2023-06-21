import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';

async function start() {
  try {
    const app = await NestFactory.create(AppModule, {cors:true});
    const PORT = process.env.PORT || 3000;
    
    app.setGlobalPrefix('api');
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    await app.listen(PORT, ()=>{
      console.log(`server running on port: ${PORT}`);
      
    });
  } catch (error) {
      console.log(error);
  } 
  
}
start();
