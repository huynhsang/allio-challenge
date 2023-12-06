import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import UserModel from '../user/user.model';

/**
 * The model of stock preference
 */
@ObjectType()
@Entity({ tableName: 'stock_preferences' })
@Unique({ properties: ['symbol', 'user'] })
export default class StockPreferenceModel {
  @Field()
  @PrimaryKey()
  id: number;

  @Field()
  @Property()
  symbol: string;

  @Field()
  @ManyToOne()
  user: UserModel;
}
