import { Field, ObjectType } from '@nestjs/graphql';
import PriceModel from './price.model';

@ObjectType()
export default class StockPriceModel {
  @Field()
  symbol: string;

  @Field()
  information: string;

  @Field()
  lastRefreshed: Date;

  @Field()
  outputSize: string;

  @Field()
  timezone: string;

  @Field(type => [PriceModel])
  prices: PriceModel[];
}
