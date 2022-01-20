import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateNewTableCompliments1642613536209 implements MigrationInterface {
    name = 'CreateNewTableCompliments1642613536209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "compliments" ("id" varchar PRIMARY KEY NOT NULL, "user_sender" varchar NOT NULL, "user_receiver" varchar NOT NULL, "tag_id" varchar NOT NULL, "message" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_compliments" ("id" varchar PRIMARY KEY NOT NULL, "user_sender" varchar NOT NULL, "user_receiver" varchar NOT NULL, "tag_id" varchar NOT NULL, "message" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_cd4e6c54f85a02905a11897e91e" FOREIGN KEY ("user_sender") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_47922731571b285347daed32941" FOREIGN KEY ("user_receiver") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3e32d250792f1db0b4dde4bc90a" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_compliments"("id", "user_sender", "user_receiver", "tag_id", "message", "created_at") SELECT "id", "user_sender", "user_receiver", "tag_id", "message", "created_at" FROM "compliments"`);
        await queryRunner.query(`DROP TABLE "compliments"`);
        await queryRunner.query(`ALTER TABLE "temporary_compliments" RENAME TO "compliments"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compliments" RENAME TO "temporary_compliments"`);
        await queryRunner.query(`CREATE TABLE "compliments" ("id" varchar PRIMARY KEY NOT NULL, "user_sender" varchar NOT NULL, "user_receiver" varchar NOT NULL, "tag_id" varchar NOT NULL, "message" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "compliments"("id", "user_sender", "user_receiver", "tag_id", "message", "created_at") SELECT "id", "user_sender", "user_receiver", "tag_id", "message", "created_at" FROM "temporary_compliments"`);
        await queryRunner.query(`DROP TABLE "temporary_compliments"`);
        await queryRunner.query(`DROP TABLE "compliments"`);
    }

}
