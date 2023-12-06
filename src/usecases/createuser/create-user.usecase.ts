import { Injectable } from '@nestjs/common';
import { IUseCase } from '../../common/interfaces/usecase.interface';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import UserModel from '../../domain/user/user.model';

/**
 * The use-case to create stock preference for user
 */
@Injectable()
export default class CreateUserUsecase implements IUseCase<UserModel> {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: EntityRepository<UserModel>,
  ) {}

  /**
   * Execute the use-case
   *
   * @param username The given username
   * @param password The given password
   */
  async invoke(username: string, password: string): Promise<UserModel> {
    const newUser = this.repository.create({ username, password });
    await this.repository.persistAndFlush(newUser);

    return newUser;
  }
}
