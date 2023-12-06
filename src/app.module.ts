import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DatabaseConfiguration } from './configuration/database.configuration';
import { HttpModule } from '@nestjs/axios';
import AllioExternalRepository from './infrastructure/rest/allio-external.repository';
import QueryStockPricesUsecase from './usecases/querystockprices/query-stock-prices.usecase';
import { StockPriceResolver } from './api/graphql/resolvers/stock-price.resolver';
import StockPreferenceModel from './domain/stockpreference/stock-preference.model';
import { PassportModule } from '@nestjs/passport';
import { AuthService, BasicAuthStrategy, GqlAuthGuard } from './auth';
import CreateStockPreferenceUsecase from './usecases/createstockpreference/create-stock-preference.usecase';
import CreateUserUsecase from './usecases/createuser/create-user.usecase';
import SearchStocksUsecase from './usecases/searchstocks/search-stocks.usecase';
import { StockResolver } from './api/graphql/resolvers/stock.resolver';
import StockPreferenceResolver from './api/graphql/resolvers/stock-preference.resolver';
import UserResolver from './api/graphql/resolvers/user.resolver';
import UserModel from './domain/user/user.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseConfiguration,
    HttpModule,
    MikroOrmModule.forFeature([StockPreferenceModel, UserModel]),
    PassportModule.register({ defaultStrategy: 'basic' }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [],
  providers: [
    BasicAuthStrategy,
    AuthService,
    GqlAuthGuard,

    // Repositories
    AllioExternalRepository,

    // Usecases
    CreateStockPreferenceUsecase,
    CreateUserUsecase,
    QueryStockPricesUsecase,
    SearchStocksUsecase,

    // Resolvers
    StockResolver,
    StockPreferenceResolver,
    StockPriceResolver,
    UserResolver,
  ],
})
export class AppModule {}
