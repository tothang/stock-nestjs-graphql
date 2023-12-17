import { IStockPrice } from '@interfaces/stockPrice.interface';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetStockPriceInput } from './input/getStockPrice.input';
import { StockService } from './stock.service';
import { Stock } from './entities/stock.entity';

@Resolver(() => Stock)
export class StockResolver {
  constructor(private readonly stockService: StockService) {}

  // resolver get stock data
  @Query(() => [Stock], { name: 'getStockPrice' })
  async getStockPrice(@Args('input') input: GetStockPriceInput) : Promise<[IStockPrice]>  {
    console.info(`@Query getStockPrice start`);
    return await this.stockService.getStockPrice(input);
  }
}
