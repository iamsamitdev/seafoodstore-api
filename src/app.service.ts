import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the NestJS API! 555'
  }

  getInfo(): string {
    return 'This is a simple API built with NestJS!'
  }
}
