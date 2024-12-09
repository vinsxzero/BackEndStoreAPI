
import { Product } from "../entities/product";
import { ISaleRequest } from "../interface/ISaleRequest";
import { ProductRepositories } from "../repositories/productRepositories";
import { SaleRepositories } from "../repositories/saleRepositories";
import { getCustomRepository } from "typeorm";
import { ProductToSaleRepositories } from "../repositories/productToSale";


class SaleService{
    // Recebe lista de ids dos produtos em string[]
    async createSale({userId, productId, clientId, quantity}: ISaleRequest){
        const saleRepositories = getCustomRepository(SaleRepositories)
        // Cria uma nova lista de product[]
        const productRepositories = getCustomRepository(ProductRepositories)

        const sale = saleRepositories.create({
            userId:userId,
            productId:productId,
            clientId:clientId,
            quantity:quantity
        })
        // Método que cria e salva tupla no banco
        const ret = await saleRepositories.save(sale)
        return ret
    }


    async listSales(){
        const saleRepositories = getCustomRepository(SaleRepositories);
        const sales = await saleRepositories
        .createQueryBuilder("sale")
        .leftJoinAndSelect("sale.user", "user")
        .leftJoinAndSelect("sale.product", "product")
        .leftJoinAndSelect("sale.client", "client")
        .select([
            "sale.id AS id",
            "sale.quantity AS quantity",
            "user.id AS userId",
            "user.name AS userName",
            "product.id AS productId",
            "product.name AS productName",
            "client.id AS clientId",
            "client.name AS clientName"
        ])
        .getRawMany();
        return sales
    }


    async updateSale({id, userId, productId, clientId, quantity}: ISaleRequest){
        const saleRepositories = getCustomRepository(SaleRepositories)

        const sale = await saleRepositories.findOne({
            id,
        });
        if(!sale){
            throw new Error("Sale does not exist")
        }
        

        sale.userId = userId
        sale.productId = productId
        sale.clientId = clientId
        sale.quantity = quantity

        const newSale = await saleRepositories.update(id, sale)
        return newSale
    }


    async deleteSale(id:any){
        if(!id){
            throw new Error("Id incorrect")
        }
        const saleRepositories = getCustomRepository(SaleRepositories)
        
        const sale = await saleRepositories.findOne({
            id,
        })
        if(!sale){
            throw new Error("Sale does not exist")
        }

        saleRepositories.delete(id);
        var messageDelete = {
            message: "Registro excluido com sucesso"
        }
        return messageDelete
    }
}

export { SaleService }