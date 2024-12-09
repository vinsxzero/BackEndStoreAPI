import {MigrationInterface, QueryRunner} from "typeorm";

export class task11733399543321 implements MigrationInterface {
    name = 'task11733399543321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `client` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `cpf` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `profile` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `admin` tinyint NOT NULL, `password` varchar(255) NOT NULL, `clientId` varchar(255) NULL, `profileId` varchar(255) NULL, `saleId` varchar(255) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sale` (`id` varchar(36) NOT NULL, `userId` varchar(255) NOT NULL, `productId` varchar(255) NOT NULL, `clientId` varchar(255) NOT NULL, `quantity` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `product` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `price` int NOT NULL, `categoryId` varchar(255) NULL, `saleId` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Vendor` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, `rating` varchar(255) NOT NULL, `isOfficial` tinyint NOT NULL, `inOperation` tinyint NOT NULL, `categoryId` varchar(255) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `category` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_56f28841fe433cf13f8685f9bc1` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_9466682df91534dd95e4dbaa616` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `sale` ADD CONSTRAINT `FK_bf176f13c0bce3c693b24523794` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `sale` ADD CONSTRAINT `FK_a0a99bbb3f0ae6ecea2abc7393b` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `sale` ADD CONSTRAINT `FK_1f170accf5236a71106a84ed97b` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_ff0c0301a95e517153df97f6812` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Vendor` ADD CONSTRAINT `FK_f618ae5e58612fdf122e56591fc` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Vendor` DROP FOREIGN KEY `FK_f618ae5e58612fdf122e56591fc`");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_ff0c0301a95e517153df97f6812`");
        await queryRunner.query("ALTER TABLE `sale` DROP FOREIGN KEY `FK_1f170accf5236a71106a84ed97b`");
        await queryRunner.query("ALTER TABLE `sale` DROP FOREIGN KEY `FK_a0a99bbb3f0ae6ecea2abc7393b`");
        await queryRunner.query("ALTER TABLE `sale` DROP FOREIGN KEY `FK_bf176f13c0bce3c693b24523794`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_9466682df91534dd95e4dbaa616`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_56f28841fe433cf13f8685f9bc1`");
        await queryRunner.query("DROP TABLE `category`");
        await queryRunner.query("DROP TABLE `Vendor`");
        await queryRunner.query("DROP TABLE `product`");
        await queryRunner.query("DROP TABLE `sale`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `profile`");
        await queryRunner.query("DROP TABLE `client`");
    }

}
