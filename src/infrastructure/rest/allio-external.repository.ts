import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import StockPriceModel from '../../domain/stockprice/stock-price.model';
import { HttpService } from '@nestjs/axios';
import {
  AllioQueryFunction,
  DataType,
  OutputSize,
} from '../../common/constants/enum';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import PriceModel from '../../domain/stockprice/price.model';
import { convertStringToCamelCase } from '../../common/utils/string.util';
import { StockPriceQueryParameter } from './types';
import StockModel from '../../domain/stockprice/stock.model';

/**
 * The external repository to interact with allio endpoint
 */
@Injectable()
export default class AllioExternalRepository {
  private readonly apiKey: string;
  private readonly endpoint: string;
  private static readonly META_DATA_KEY = 'Meta Data';
  private static readonly TIME_SERIES_KEY = 'Time Series';
  private static readonly GLOBAL_QUOTE_KEY = 'Global Quote';

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.apiKey = configService.get('ALLIO_API_KEY');
    this.endpoint = configService.get('ALLIO_ENDPOINT');
  }

  /**
   * Execute an external query to fetch stock prices
   *
   * @param fn The function name to query
   * @param symbol The stock's symbol
   * @param param The additional parameter to query
   */
  async queryStockPrices(
    fn: AllioQueryFunction,
    symbol: string,
    param: StockPriceQueryParameter,
  ): Promise<StockPriceModel> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(this.endpoint, {
          params: {
            function: fn,
            symbol: symbol,
            interval: param.interval,
            adjusted: param.adjusted ?? true,
            extended_hours: param.extendedHours ?? true,
            month: param.month,
            datatype: param.dataType || DataType.JSON,
            outputsize: param.outputSize || OutputSize.COMPACT,
            apikey: this.apiKey,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.error('An Error Occur:', error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    console.log('DATA after queried: ', data);
    return this.convertToStockPriceModel(data);
  }

  /**
   * Execute an external request to search stocks by the given keyword
   *
   * @param keyword The given keyword to search
   */
  async searchStocks(keyword: string): Promise<StockModel[]> {
    const {
      data: { bestMatches: allStocks },
    } = await firstValueFrom(
      this.httpService
        .get(this.endpoint, {
          params: {
            function: AllioQueryFunction.SYMBOL_SEARCH,
            keywords: keyword,
            apikey: this.apiKey,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.error('Search failed:', error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return (allStocks ?? []).map(this.convertToStockModel);
  }

  private convertToStockModel(data: any): StockModel {
    const stock = new StockModel();
    Object.keys(data).forEach((key) => {
      const keyName = key.split('. ')[1];
      stock[keyName] = data;
    });

    return stock;
  }

  private convertToStockPriceModel(data: any): StockPriceModel {
    let stockPrice = new StockPriceModel();
    Object.keys(data).forEach((key) => {
      if (key === AllioExternalRepository.META_DATA_KEY) {
        this._fillUpStockDataWithMetaData(stockPrice, data[key]);
      } else if (key.includes(AllioExternalRepository.TIME_SERIES_KEY)) {
        stockPrice.prices = this._extractPricesFromTimeSeries(data[key]);
      } else if (key === AllioExternalRepository.GLOBAL_QUOTE_KEY) {
        stockPrice = this._extractStockPriceFromGlobalQuote(data[key]);
      }
    });

    return stockPrice;
  }

  private _fillUpStockDataWithMetaData(stock: StockPriceModel, metaData: any) {
    Object.keys(metaData).forEach((key) => {
      const keyName = key.split('. ')[1];
      const property = convertStringToCamelCase(keyName);
      stock[property] = metaData[key];
    });
  }

  private _extractPricesFromTimeSeries(timeSeries: any): PriceModel[] {
    const prices: PriceModel[] = [];
    Object.keys(timeSeries).forEach((dateTime) => {
      const price = new PriceModel();
      price.dateTime = new Date(dateTime);
      Object.keys(timeSeries[dateTime]).forEach((key) => {
        const keyName = key.split('. ')[1];
        const property = convertStringToCamelCase(keyName);
        price[property] = timeSeries[dateTime][key];
      });

      prices.push(price);
    });

    return prices;
  }

  private _extractStockPriceFromGlobalQuote(globalQuote: any): StockPriceModel {
    const stockPrice = new StockPriceModel();
    const price = new PriceModel();
    Object.keys(globalQuote).forEach((key) => {
      const keyName = key.split('. ')[1];
      const property = convertStringToCamelCase(keyName);
      if (property === 'symbol') {
        stockPrice.symbol = globalQuote[key];
      } else {
        price[property] = globalQuote[key];
      }
    });
    stockPrice.prices = [price];

    return stockPrice;
  }
}
