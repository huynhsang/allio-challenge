import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { StockPriceParameter } from '../../domain/stockprice/types';
import StockPriceModel from '../../domain/stockprice/stock-price.model';
import { HttpService } from '@nestjs/axios';
import { DataType, OutputSize } from '../../common/constants/enum';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export default class AllioServiceStockPriceRepository {
  private readonly apiKey: string;
  private readonly endpoint: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.apiKey = configService.get('ALLIO_API_KEY');
    this.endpoint = configService.get('ALLIO_ENDPOINT');
  }

  async queryStockPrices(param: StockPriceParameter): Promise<StockPriceModel> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(this.endpoint, {
          params: {
            function: param.function,
            symbol: param.symbol,
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

    return this.convertToStockPriceModel(data);
  }

  private convertToStockPriceModel(data: any): StockPriceModel {
    console.log(data);
    return new StockPriceModel();
  }
}
