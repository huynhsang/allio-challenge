import { Migration } from '@mikro-orm/migrations';

export class Migration20231206172807 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null);',
    );
    this.addSql(
      'alter table "users" add constraint "users_username_unique" unique ("username");',
    );

    this.addSql(
      'create table "stock_preferences" ("id" serial primary key, "symbol" varchar(255) not null, "user_id" int not null);',
    );
    this.addSql(
      'alter table "stock_preferences" add constraint "stock_preferences_symbol_user_id_unique" unique ("symbol", "user_id");',
    );

    this.addSql(
      'alter table "stock_preferences" add constraint "stock_preferences_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "stock_preferences" drop constraint "stock_preferences_user_id_foreign";',
    );

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "stock_preferences" cascade;');
  }
}
