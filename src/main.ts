import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {

  // สร้าง Application ด้วย AppModule ที่เราสร้างไว้
  const app = await NestFactory.create(AppModule)
  
  // ตั้งค่า Swagger
  const config = new DocumentBuilder()
    .setTitle('Seafood Store API')
    .setDescription('The Seafood Store API description')
    .setVersion('1.0')
    .addTag('seafood')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  
  await app.listen(process.env.PORT ?? 3000)
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`)
}

bootstrap()