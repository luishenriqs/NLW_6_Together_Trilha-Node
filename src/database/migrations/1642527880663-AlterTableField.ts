import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableField1642527880663 implements MigrationInterface {
    name = 'AlterTableField1642527880663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "password" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "email", "admin", "created_at", "updated_at", "password") SELECT "id", "name", "email", "admin", "created_at", "updated_at", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "password" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "email", "admin", "created_at", "updated_at", "password") SELECT "id", "name", "email", "admin", "created_at", "updated_at", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "password" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "email", "admin", "created_at", "updated_at", "password") SELECT "id", "name", "email", "admin", "created_at", "updated_at", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "password" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "email", "admin", "created_at", "updated_at", "password") SELECT "id", "name", "email", "admin", "created_at", "updated_at", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
