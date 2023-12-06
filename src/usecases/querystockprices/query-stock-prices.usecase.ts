import { IUseCase } from '../../common/interfaces/usecase.interface';
import { Injectable } from '@nestjs/common';
import AllioServiceStockPriceRepository from '../../infrastructure/rest/allio-service-stock-price.repository';
import { StockPriceParameter } from '../../domain/stockprice/types';
import StockPriceModel from '../../domain/stockprice/stock-price.model';

/**
 *
 */
@Injectable()
export default class QueryStockPricesUsecase
  implements IUseCase<StockPriceModel>
{
  constructor(
    private readonly allioServiceStockPriceRepository: AllioServiceStockPriceRepository,
  ) {}

  invoke(param: StockPriceParameter): Promise<StockPriceModel> {
    return this.allioServiceStockPriceRepository.queryStockPrices(param);
  }
}
