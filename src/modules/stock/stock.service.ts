import { ConfigService } from '@config';
import { IStockPrice } from '@interfaces/stockPrice.interface';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GetStockPriceInput } from '@src/modules/stock/input/getStockPrice.input';
// Stock service where handle logic of stocks

@Injectable()
export class StockService {
  constructor(private readonly httpService: HttpService) {}
  // function get stock by arg
  async getStockPrice(
    input: GetStockPriceInput,
  ): Promise<
    IStockPrice[]
  > {
    try {
      console.info(`getStockPrice start with input ${JSON.stringify(input)}`);
      const { ticker, date, interval } = input;
      const key = ConfigService.getInstance().get('ALPHA_VANTAGE_API_KEY');
      const functionType =
        interval === '1min' ||
        interval === '5min' ||
        interval === '15min' ||
        interval === '30min'
          ? 'TIME_SERIES_INTRADAY'
          : 'TIME_SERIES_DAILY';
      console.info(functionType, functionType);
      let url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${ticker}&apikey=${key}`;

      if (interval) url += `&interval=${interval}`;

      console.log(url);
      const result = await this.httpService.axiosRef.get(url, {
        headers: { 'User-Agent': 'request' },
      });

      const timeSeriesKey =
        functionType === 'TIME_SERIES_INTRADAY'
          ? `Time Series (${interval})`
          : 'Time Series (Daily)';
      const data = result.data[timeSeriesKey];

      const filteredData = date && !interval ? { date: data[date] } : data;
      const entries = Object.entries(filteredData || {});

      const stocks = entries.map(([date, stockData]) => {
        return {
          ticker: ticker,
          open: parseFloat(<string>stockData['1. open']),
          high: parseFloat(<string>stockData['2. high']),
          low: parseFloat(<string>stockData['3. low']),
          close: parseFloat(<string>stockData['4. close']),
          volume: parseFloat(<string>stockData['5. volume']),
          date: date,
          interval: interval,
        };
      });
      console.info(`getStockPrice end with result ${JSON.stringify(stocks)}`);
      return stocks;
    } catch (e) {
      console.error(`getStockPrice failed with error ${JSON.stringify(e)}`);
    }
  }
}
