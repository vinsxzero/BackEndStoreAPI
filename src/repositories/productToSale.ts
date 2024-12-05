import { EntityRepository, Repository } from "typeorm";
import { ProductToSale } from "../entities/productToSale";

@EntityRepository(ProductToSale)
class ProductToSaleRepositories extends Repository<ProductToSale> {}

export { ProductToSaleRepositories };