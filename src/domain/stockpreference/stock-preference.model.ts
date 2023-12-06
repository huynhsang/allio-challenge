import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ tableName: 'stock_preferences' })
export default class StockPreferenceModel {
  @Field()
  @PrimaryKey()
  id: number;

  @Field()
  @Property()
  symbol: string;

  @Field()
  @Property()
  userId: number;
}
