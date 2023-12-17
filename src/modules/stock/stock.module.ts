import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockResolver } from './stock.resolver';

@Module({
  imports: [HttpModule],
  providers: [StockResolver, StockService],
})
export class StockModule {}
