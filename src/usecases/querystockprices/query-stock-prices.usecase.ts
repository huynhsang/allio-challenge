import { IUseCase } from '../../common/interfaces/usecase.interface';
import { Injectable } from '@nestjs/common';
import AllioExternalRepository from '../../infrastructure/rest/allio-external.repository';
import StockPriceModel from '../../domain/stockprice/stock-price.model';
import { AllioQueryFunction } from '../../common/constants/enum';
import UnsupportedFunctionException from '../../common/exceptions/unsupport-function.exception';
import { StockPriceQueryParameter } from '../../infrastructure/rest/types';

/**
 * The use-case to query stock prices based on stock's symbol and other parameters
 */
@Injectable()
export default class QueryStockPricesUsecase
  implements IUseCase<StockPriceModel>
{
  private static readonly SUPPORTED_FUNCTIONS = [
    AllioQueryFunction.TIME_SERIES_INTRADAY,
    AllioQueryFunction.TIME_SERIES_DAILY,
    AllioQueryFunction.TIME_SERIES_DAILY_ADJUSTED,
    AllioQueryFunction.TIME_SERIES_WEEKLY,
    AllioQueryFunction.TIME_SERIES_MONTHLY,
    AllioQueryFunction.TIME_SERIES_MONTHLY_ADJUSTED,
    AllioQueryFunction.GLOBAL_QUOTE,
  ];

  constructor(
    private readonly allioExternalRepository: AllioExternalRepository,
  ) {}

  /**
   * Execute the use-case
   *
   * @param fn The function name to query
   * @param symbol The stock's symbol
   * @param param The additional parameter to query
   */
  async invoke(
    fn: AllioQueryFunction,
    symbol: string,
    param: StockPriceQueryParameter,
  ): Promise<StockPriceModel> {
    console.log(`Query fn: ${fn} symbol: ${symbol} param: ${param}`);
    if (!QueryStockPricesUsecase.SUPPORTED_FUNCTIONS.includes(fn)) {
      throw new UnsupportedFunctionException(fn);
    }

    return this.allioExternalRepository.queryStockPrices(fn, symbol, param);
  }
}
