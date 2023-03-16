import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // middlewares can be used here like app.use(middelwarename). Use only if use should connect middleware to each route.
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
