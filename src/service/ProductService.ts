import { getCustomRepository } from "typeorm";
import { IProductRequest } from "../interface/IProductRequest";
import { ProductRepositories } from "../repositories/productRepositories";


class ProductService{
    async createProduct({ name, description, price, categoryId }: IProductRequest){
        const productRepositories = getCustomRepository(ProductRepositories)

        const product = productRepositories.create({
            name, 
            description, 
            price, 
            categoryId,
        });
        await productRepositories.save(product)

        return product
    }


    async listProducts(){
        const productRepositories = getCustomRepository(ProductRepositories)    
        const products = await productRepositories
        .createQueryBuilder("product")
        .innerJoin("product.category", "category")
        .select([
            "product.id AS id",
            "product.name AS name",
            "product.description AS description",
            "product.price AS price",
            "product.categoryId AS categoryId",
            "category.name AS categoryName",
        ])
        // .addSelect("category.name", "categoryName") // Define um alias personalizado para o nome da categoria
        .getRawMany();
        return products
    }


    async updateProduct({id, name, description, price, categoryId }: IProductRequest){
        const productRepositories = getCustomRepository(ProductRepositories)
        
        const product = await productRepositories.findOne({
            id,
        });

        if(!product){
            throw new Error("Product not found")
        }

        product.name = name
        product.description = description
        product.price = price
        product.categoryId = categoryId
        
        const res = await productRepositories.update(id, product)

        return res
    }


    async deleteProduct(id){
        const productRepositories = getCustomRepository(ProductRepositories)
        
        const product = await productRepositories.findOne({
            id,
        });

        if(!product){
            throw new Error("Product not found")
        }

        await productRepositories.delete(id)
        var messageDelete = {
            message: "Registro excluido com sucesso"
        }
        return messageDelete
    }
}

export { ProductService }