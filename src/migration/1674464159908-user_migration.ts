import { MigrationInterface, QueryRunner } from "typeorm";

export class userMigration1674464159908 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      insert into product (id, product_id, product_name) values ('bb568fdd-a9e5-42fa-ac46-f5d0069563f6', '32d06c1e-6875-4655-88c0-89f3097b41d6', 'Tart Shells - Sweet, 3');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
