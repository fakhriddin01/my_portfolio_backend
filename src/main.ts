import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
import { CustomLoggerService } from './logger/logger.service'; // Import custom logger

async function start() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new CustomLoggerService(); // Use custom logger
  const PORT = process.env.PORT || 3000;
  
  app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Middleware to log each request
  app.use((req, res, next) => {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const delay = Date.now() - start;
      const { statusCode } = res;
      logger.log(`${method} ${originalUrl} ${statusCode} - ${delay}ms`);
    });

    next();
  });

  await app.listen(PORT, () => {
    logger.log(`Server running on port: ${PORT}`);
  });
}

start();
