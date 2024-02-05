import { MigrationInterface, QueryRunner } from "typeorm";

export class AddName1707141897675 implements MigrationInterface {
    name = 'AddName1707141897675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`document\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`document\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`document\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`document\` varchar(16) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
    }

}
