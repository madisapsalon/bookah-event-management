import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return JSON.stringify({
      host: process.env.HOST,
      port: process.env.PORT,
    });
  }
}
