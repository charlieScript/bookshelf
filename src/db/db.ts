import "reflect-metadata";
import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'sqlite',
  database: 'books.sqlite',
  logging: false,
  synchronize: true,
  name: 'default',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
});
