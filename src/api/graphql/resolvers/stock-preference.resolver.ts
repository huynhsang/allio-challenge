import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import StockPreferenceModel from '../../../domain/stockpreference/stock-preference.model';
import { Inject, UseGuards } from '@nestjs/common';
import CreateStockPreferenceUsecase from '../../../usecases/createstockpreference/create-stock-preference.usecase';
import { GqlAuthGuard } from '../../../auth';

/**
 * The Stock resolver that provide GraphQL operation into stock preference model
 */
@Resolver((of) => StockPreferenceModel)
export default class StockPreferenceResolver {
  constructor(
    @Inject(CreateStockPreferenceUsecase)
    private createStockPreferenceUsecase: CreateStockPreferenceUsecase,
  ) {}

  /**
   * Create a stock reference for user
   *
   * @param symbol The stock's symbol
   * @param ctx The request context
   */
  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => StockPreferenceModel)
  async createPreference(
    @Args('symbol') symbol: string,
    @Context() ctx: any,
  ): Promise<StockPreferenceModel> {
    return await this.createStockPreferenceUsecase.invoke(ctx.req.user, symbol);
  }
}
