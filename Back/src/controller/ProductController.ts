import { Request, Response } from "express";
import { ProductService } from "../service/ProductService";

class ProductController{
    async createProduct(request: Request, response: Response) {
        const {name, description, price, categoryId} = request.body;
        const product = 
        {
            name:name,
            description:description,
            price:price,
            categoryId:categoryId
        };
        const productService = new ProductService()
        const res =  await productService.createProduct(product)
        return response.json(res);
    } 

    async listProducts(req, res){
        const productService = new ProductService()
        const products = await productService.listProducts()

        return res.json(products)
        
    }


    async updateProduct(request: Request, response: Response) {
        const {name, description, price, categoryId} = request.body;

        const id = request.params.id;

        const product = 
        {
            id: id,
            name:name,
            description:description,
            price:price,
            categoryId:categoryId
        };

        const productService = new ProductService()
        const res =  await productService.updateProduct(product)
        return response.json(res);
    }

    async deleteProduct(request: Request, response: Response){
        const id = request.params.id

        const productService = new ProductService()
        const res = await productService.deleteProduct(id)
        
        return response.json(res)
    }
}

export { ProductController }