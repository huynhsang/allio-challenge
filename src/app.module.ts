import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
// import { MikroOrmModule } from '@mikro-orm/nestjs';
import Joi from 'joi';
import { DatabaseConfiguration } from './configuration/database.configuration';
import { HttpModule } from '@nestjs/axios';
import AllioServiceStockPriceRepository from './infrastructure/rest/allio-service-stock-price.repository';
import QueryStockPricesUsecase from './usecases/querystockprices/query-stock-prices.usecase';
import { StockPriceResolver } from './api/graphql/resolvers/stock-price.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        ALLIO_API_KEY: Joi.string().required(),
        ALLIO_ENDPOINT: Joi.string().required(),
      }),
    }),
    DatabaseConfiguration,
    HttpModule,
    // MikroOrmModule.forFeature([]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [
    AllioServiceStockPriceRepository,
    QueryStockPricesUsecase,
    StockPriceResolver,
  ],
})
export class AppModule {}
