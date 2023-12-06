import { Field, ObjectType } from '@nestjs/graphql';

/**
 * The price model data
 */
@ObjectType()
export default class PriceModel {
  @Field()
  open: string;

  @Field()
  high: string;

  @Field()
  low: string;

  @Field()
  close: string;

  @Field({ nullable: true })
  adjustedClose?: string;

  @Field({ nullable: true })
  volume?: string;

  @Field({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  dividendAmount?: string;

  @Field({ nullable: true })
  splitCoefficient?: string;

  @Field({ nullable: true })
  latestTradingDay?: string;

  @Field({ nullable: true })
  previousClose?: string;

  @Field({ nullable: true })
  change?: string;

  @Field({ nullable: true })
  changePercent?: string;

  @Field({ nullable: true })
  dateTime?: Date;
}
