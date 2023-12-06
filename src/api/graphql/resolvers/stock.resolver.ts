import { Args, Query, Resolver } from '@nestjs/graphql';
import StockPriceModel from '../../../domain/stockprice/stock-price.model';
import { Inject } from '@nestjs/common';
import StockModel from '../../../domain/stockprice/stock.model';
import SearchStocksUsecase from '../../../usecases/searchstocks/search-stocks.usecase';

/**
 * The Stock resolver that provide GraphQL operation into stock model
 */
@Resolver((of) => StockModel)
export class StockResolver {
  constructor(
    @Inject(SearchStocksUsecase)
    private searchStocksUsecase: SearchStocksUsecase,
  ) {}

  /**
   * Search stocks by the given keyword
   *
   * @param keyword The given keyword
   */
  @Query((returns) => [StockModel])
  async search(@Args('keyword') keyword: string): Promise<StockModel[]> {
    return await this.searchStocksUsecase.invoke(keyword);
  }
}
