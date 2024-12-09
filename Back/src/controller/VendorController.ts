import { Request, Response } from "express";
import { VendorService } from "../service/VendorService";
class VendorController{
    async createVendor(request:Request, response:Response){
        const {name, address, rating, isOfficial, inOperation, categoryId} = request.body
        const vendorService = new VendorService()
        const vendor  = {
            name:name,
            address:address,
            rating:rating,
            isOfficial: isOfficial,
            inOperation: inOperation,
            categoryId:categoryId
        }
        const ret = await vendorService.createVendor(vendor)
        return response.json(ret)
    }
    async updateVendor(request:Request, response:Response){
        const {name, address, rating, isOfficial, inOperation, categoryId} = request.body
        const id = request.params.id
        const vendorService = new VendorService()
        const vendor = {
            id:id,
            name:name,
            address:address,
            rating:rating, 
            isOfficial:isOfficial,
            inOperation:inOperation,
            categoryId:categoryId
        }
        
        const ret = await vendorService.updateVendor(vendor)
        console.log(ret)
        return response.json(ret)
        
    }
    async listVendors(req, res) {
        const vendorService = new VendorService();
        const ret= await vendorService.listVendor();
        return res.json(ret)
    }
    async deleteVendor(request:Request, response:Response){
        const vendorService = new VendorService()
        const id = request.params.id
        const ret = await vendorService.deleteVendor({id})
        return response.json(ret)
    }
    
}
export {VendorController}