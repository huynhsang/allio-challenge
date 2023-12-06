import { Injectable } from '@nestjs/common';
import { IUseCase } from '../../common/interfaces/usecase.interface';
import StockPreferenceModel from '../../domain/stockpreference/stock-preference.model';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import UserModel from '../../domain/user/user.model';

/**
 * The use-case to create stock preference for user
 */
@Injectable()
export default class CreateStockPreferenceUsecase
  implements IUseCase<StockPreferenceModel>
{
  constructor(
    @InjectRepository(StockPreferenceModel)
    private readonly repository: EntityRepository<StockPreferenceModel>,
  ) {}

  /**
   * Execute the use-case
   *
   * @param user The user instance
   * @param symbol The stock's symbol
   */
  async invoke(user: UserModel, symbol: string): Promise<StockPreferenceModel> {
    const newPreference = this.repository.create({ user, symbol });
    await this.repository.persistAndFlush(newPreference);

    return newPreference;
  }
}
