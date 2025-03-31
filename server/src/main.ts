import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

const PORT = Number(process.env.PORT) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  app.enableCors({
    origin: [
      'http://localhost:3000', // for the dev mode
      'https://recipes-platform-valerjanochka.vercel.app', // for production
    ],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () =>
    console.log(`Server is listening on port ${PORT}`),
  );
}
bootstrap();
