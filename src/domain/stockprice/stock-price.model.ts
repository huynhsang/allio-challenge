import { Field, ObjectType } from '@nestjs/graphql';
import PriceModel from './price.model';

/**
 * The model of stock price
 */
@ObjectType()
export default class StockPriceModel {
  @Field()
  symbol: string;

  @Field({ nullable: true })
  information?: string;

  @Field({ nullable: true })
  lastRefreshed: Date;

  @Field({ nullable: true })
  interval: string;

  @Field({ nullable: true })
  outputSize: string;

  @Field({ nullable: true })
  timezone: string;

  @Field(type => [PriceModel])
  prices: PriceModel[];
}
