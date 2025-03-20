import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ProductsModule } from './products/products.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HealthController } from './health/health.controller';
import { StoreController } from './store/store.controller';
import { StoreService } from './store/store.service';
import { Category } from './store/entities/category.entity'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DATABASE_HOST'),
      port: configService.get('DATABASE_PORT'),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      synchronize: false,
      entities: [Category],
    }),
  }),
  TypeOrmModule.forFeature([Category]),
  ProductsModule
],
  controllers: [
    AppController, 
    HealthController, 
    StoreController
  ],
  providers: [AppService, StoreService],
})
export class AppModule {}
