import { Logger } from '@nestjs/common';
import { config } from 'dotenv';

export class ConfigService {
  private readonly _logger = new Logger('ConfigService');
  private static _instance: ConfigService;

  constructor() {
    config({
      path: '.env',
    });
  }

  static getInstance() {
    if (this._instance) return this._instance;
    this._instance = new ConfigService();
    Object.freeze(this._instance);
    return this._instance;
  }

  get httpTimeout(): number {
    return +this.get('httpTimeout') || 5000;
  }

  public get(key: string): string {
    return process.env[key] || '';
  }
}
