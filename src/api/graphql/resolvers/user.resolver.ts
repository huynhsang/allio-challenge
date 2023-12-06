import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import UserModel from '../../../domain/user/user.model';
import CreateUserUsecase from '../../../usecases/createuser/create-user.usecase';
import SignUpDto from '../dtos/sign-up.dto';

/**
 * The Stock resolver that provide GraphQL operation into user model
 */
@Resolver((of) => UserModel)
export default class UserResolver {
  constructor(
    @Inject(CreateUserUsecase)
    private createUserUsecase: CreateUserUsecase,
  ) {}

  /**
   * Register a new user
   *
   * @param signUpDto The sign up data
   */
  @Mutation((returns) => UserModel)
  async signup(@Args('user') signUpDto: SignUpDto): Promise<UserModel> {
    return await this.createUserUsecase.invoke(
      signUpDto.username,
      signUpDto.password,
    );
  }
}
