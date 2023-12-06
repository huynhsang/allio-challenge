import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import UserModel from '../domain/user/user.model';
import { EntityRepository } from '@mikro-orm/core';

/**
 * The auth service
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: EntityRepository<UserModel>,
  ) {}

  /**
   * Validate user with the given username and password
   *
   * @param username The given username
   * @param password The given password
   */
  async validateUser(username: string, password: string): Promise<UserModel> {
    return await this.userRepository.findOneOrFail({
      username,
      password,
    });
  }
}
