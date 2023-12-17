import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private httpService: HttpService) {}

  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
