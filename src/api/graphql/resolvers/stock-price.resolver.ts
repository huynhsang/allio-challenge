import { Args, Query, Resolver } from '@nestjs/graphql';
import StockPriceModel from '../../../domain/stockprice/stock-price.model';
import { Inject } from '@nestjs/common';
import QueryStockPricesUsecase from '../../../usecases/querystockprices/query-stock-prices.usecase';
import { DataType, OutputSize } from '../../../common/constants/enum';

@Resolver((of) => StockPriceModel)
export class StockPriceResolver {
  constructor(
    @Inject(QueryStockPricesUsecase)
    private queryStockPricesUsecase: QueryStockPricesUsecase,
  ) {}

  @Query((returns) => StockPriceModel)
  async stockPrices(
    @Args('function') fn: string,
    @Args('symbol') symbol: string,
    @Args('outputSize', { nullable: true }) outputSize: OutputSize,
    @Args('dataType', { nullable: true }) dataType: DataType,
  ): Promise<StockPriceModel> {
    console.log('Input fn:', fn);
    return await this.queryStockPricesUsecase.invoke({
      function: fn,
      symbol,
      outputSize,
      dataType,
    });
  }
}
