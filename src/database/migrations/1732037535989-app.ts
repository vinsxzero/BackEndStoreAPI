import {MigrationInterface, QueryRunner} from "typeorm";

export class app1732037535989 implements MigrationInterface {
    name = 'app1732037535989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `category` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `client` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `cpf` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `payment` (`id` varchar(36) NOT NULL, `date` datetime NOT NULL, `valor` int NOT NULL, `metododePagamento` varchar(255) NOT NULL, `status` varchar(255) NOT NULL, `parcelamento` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `product` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `price` int NOT NULL, `categoryId` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sale` (`id` varchar(36) NOT NULL, `userId` varchar(255) NOT NULL, `productId` varchar(255) NOT NULL, `clientId` varchar(255) NOT NULL, `quantity` int NOT NULL, `value` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `admin` tinyint NOT NULL, `password` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `sale`");
        await queryRunner.query("DROP TABLE `product`");
        await queryRunner.query("DROP TABLE `payment`");
        await queryRunner.query("DROP TABLE `client`");
        await queryRunner.query("DROP TABLE `category`");
    }

}
