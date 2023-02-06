import { DataSource } from "typeorm";
import { Product, User } from "../entities";
import { userMigration1674464159908 } from "../migration/1674464159908-user_migration";

export const app_datasource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 8889,
  username: "root",
  password: "root",
  database: "json-01",
  entities: [User, Product],
  synchronize: true,
  logging: true,
  migrationsTableName: "product",
  migrations: [userMigration1674464159908],
});
