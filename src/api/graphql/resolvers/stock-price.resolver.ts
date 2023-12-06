import { Args, Query, Resolver } from '@nestjs/graphql';
import StockPriceModel from '../../../domain/stockprice/stock-price.model';
import { Inject } from '@nestjs/common';
import QueryStockPricesUsecase from '../../../usecases/querystockprices/query-stock-prices.usecase';
import { AllioQueryFunction, OutputSize } from '../../../common/constants/enum';

/**
 * The Stock Price resolver that provide GraphQL operation into stock price model
 */
@Resolver((of) => StockPriceModel)
export class StockPriceResolver {
  constructor(
    @Inject(QueryStockPricesUsecase)
    private queryStockPricesUsecase: QueryStockPricesUsecase,
  ) {}

  /**
   * Query stock prices data based on stock's symbol and other parameters
   *
   * @param fn The query function name
   * @param symbol The stock's symbol
   * @param interval Time interval between two consecutive data points in the time series
   * @param outputSize The data size to return
   * @param adjusted the output time series is adjusted by historical split and dividend events.
   * @param extendedHours the output time series will include both the regular trading hours and the extended trading hours
   * @param month use the month parameter (in YYYY-MM format) to query a specific month in history
   */
  @Query((returns) => StockPriceModel)
  async stockPrices(
    @Args('function') fn: AllioQueryFunction,
    @Args('symbol') symbol: string,
    @Args('interval', { nullable: true }) interval?: string,
    @Args('outputSize', { nullable: true }) outputSize?: OutputSize,
    @Args('adjusted', { nullable: true }) adjusted?: boolean,
    @Args('extended_hours', { nullable: true }) extendedHours?: boolean,
    @Args('month', { nullable: true }) month?: string,
  ): Promise<StockPriceModel> {
    return await this.queryStockPricesUsecase.invoke(fn, symbol, {
      interval,
      outputSize,
      adjusted,
      extendedHours,
      month,
    });
  }
}
