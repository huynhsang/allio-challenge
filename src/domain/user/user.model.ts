import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import StockPreferenceModel from '../stockpreference/stock-preference.model';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * The model of user
 */
@ObjectType()
@Entity({ tableName: 'users' })
export default class UserModel {
  @Field()
  @PrimaryKey()
  id: number;

  @Field()
  @Property()
  @Unique()
  username: string;

  @Field()
  @Property()
  password: string;

  @OneToMany(
    () => StockPreferenceModel,
    (preference: StockPreferenceModel) => preference.user,
  )
  posts: Collection<StockPreferenceModel>;
}
