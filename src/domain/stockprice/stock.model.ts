import { Field, ObjectType } from '@nestjs/graphql';

/**
 * The model of stock
 */
@ObjectType()
export default class StockModel {
  @Field()
  symbol: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  region: string;

  @Field({ nullable: true })
  marketOpen: string;

  @Field({ nullable: true })
  marketClose: string;

  @Field({ nullable: true })
  timezone: string;

  @Field({ nullable: true })
  currency: string;
}
