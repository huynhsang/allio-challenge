import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
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

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseConfiguration,
    HttpModule,
    MikroOrmModule.forFeature([StockPreferenceModel]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [
    AllioExternalRepository,
    QueryStockPricesUsecase,
    StockPriceResolver,
  ],
})
export class AppModule {}
