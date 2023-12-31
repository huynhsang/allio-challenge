import { IUseCase } from '../../common/interfaces/usecase.interface';
import StockModel from '../../domain/stockprice/stock.model';
import AllioExternalRepository from '../../infrastructure/rest/allio-external.repository';
import { Injectable } from '@nestjs/common';

/**
 * The use-case to search stocks by the given keyword
 */
@Injectable()
export default class SearchStocksUsecase implements IUseCase<StockModel[]> {
  constructor(
    private readonly allioExternalRepository: AllioExternalRepository,
  ) {}

  /**
   * Execute the use-case
   *
   * @param keyword The given keyword to search stocks
   */
  async invoke(keyword: string): Promise<StockModel[]> {
    return this.allioExternalRepository.searchStocks(keyword);
  }
}
