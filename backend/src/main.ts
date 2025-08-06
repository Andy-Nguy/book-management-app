import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 🔹 Bật ValidationPipe và transform dữ liệu
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ field không có trong DTO
      forbidNonWhitelisted: true, // báo lỗi nếu có field lạ
      transform: true, // ép kiểu (string -> number) dựa vào DTO
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(3000);
}
bootstrap();
