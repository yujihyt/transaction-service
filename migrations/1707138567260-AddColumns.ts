import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumns1707138567260 implements MigrationInterface {
    name = 'AddColumns1707138567260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`credit\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`document\` varchar(16) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`document\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`credit\``);
    }

}
