import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
// import { ProductsModule } from './products/products.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HealthController } from './health/health.controller';
import { StoreModule } from './store/store.module';
import { AuthModule } from './auth/auth.module';
// import { RouterModule } from '@nestjs/core'

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
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false
    }),
  }),
  // RouterModule.register([
  //   {
  //     path: 'health',
  //     module: HealthController
  //   },
  //   {
  //     path: 'api',
  //     module: AuthModule
  //   },
  //   {
  //     path: 'store',
  //     module: StoreModule
  //   }
  // ]),
  // ProductsModule,
  StoreModule,
  AuthModule
],
  controllers: [
    AppController, 
    HealthController
  ],
  providers: [AppService],
})
export class AppModule {}
