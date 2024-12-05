import { getCustomRepository } from "typeorm";
import { VendorRepositories } from "../repositories/vendorRepositories";

class VendorService{
    async createVendor({name, address, rating, isOfficial, inOperation, categoryId}){
        const vendorRepositories = getCustomRepository(VendorRepositories)
        const vendor = await vendorRepositories.create({
            name:name,
            address:address,
            rating:rating,
            isOfficial:isOfficial,
            inOperation:inOperation,
            categoryId: categoryId
        })
        const ret = await vendorRepositories.save(vendor)
        return ret
    }
    async updateVendor({id, name, address, rating, isOfficial, inOperation, categoryId}){
        const vendorRepositories = getCustomRepository(VendorRepositories)
        const findVendor = await vendorRepositories.findOne({
            id,
        })
        if(!findVendor){
            throw new Error("Vendedor não existente")
        }
        findVendor.name=name
        findVendor.address=address
        findVendor.rating = rating
        findVendor.isOfficial=isOfficial
        findVendor.inOperation=inOperation
        findVendor.categoryId=categoryId
        console.log(findVendor.name)
        const ret = await vendorRepositories.update(id, findVendor)
        return ret
    }


    
    async listVendor(){
        const vendorRepositories = getCustomRepository(VendorRepositories)
        const vendor = await    vendorRepositories
        .createQueryBuilder("vendor")
        .innerJoin("vendor.category", "category")
        .select([
            "vendor.id AS id",
            "vendor.name AS name",
            "vendor.rating AS rating",
            "vendor.address AS address",
            "vendor.inOperation AS inOperation",
            "vendor.isOfficial AS isOfficial",
            "category.id AS categoryId",
            "category.name AS categoryName"
        ])
        .getRawMany()
        return vendor
    }
    async deleteVendor({id}){
        const vendorRepositories = getCustomRepository(VendorRepositories)
        const findVendor = await vendorRepositories.findOne({id})
        if(!findVendor){
            throw new Error("Vendedor inexistente")
        } 
        const ret = await vendorRepositories.delete({id})
        return ret
    }
}
export {VendorService}