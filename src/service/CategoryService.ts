import { ICategoryRequest } from "../interface/ICategoryRequest";
import { CategoryRepositories } from "../repositories/categoryRepositories";
import { getCustomRepository } from "typeorm";

class CategoryService{
    async createCategory({ name, description}: ICategoryRequest){
        const categoryRepositories = getCustomRepository(CategoryRepositories);

        const categoryExists = await categoryRepositories.findOne({
            name,
        });
        if(categoryExists){
            throw new Error("Category already exists with this name")
        }

        const category = categoryRepositories.create({
            name,
            description
        })
        await categoryRepositories.save(category)
        return category;
    }


    async listCategories(){
        const categoryRepositories = getCustomRepository(CategoryRepositories);
        const categories = await categoryRepositories
        .createQueryBuilder("category")
        .getMany()
        
        return categories
    }


    async updateCategory({ id, name, description }){
        const categoryRepositories = getCustomRepository(CategoryRepositories)

        const category = await categoryRepositories.findOne({
            id,
        })
        if(!category){
            throw new Error("Category not found")
        }

        category.name = name
        category.description = description

        const res = await categoryRepositories.update(id, category)

        return res
    }


    async deleteCategory(id:any){
        if(!id){
            throw new Error("Id error")
        }
        
        const categoryRepositories = getCustomRepository(CategoryRepositories)

        const categoryExists = categoryRepositories.findOne({
            id,
        })
        if(!categoryExists){
            throw new Error("Category not found")
        }

        await categoryRepositories.delete(id)
        var messageDelete = {
            message: "Registro excluido com sucesso"
        }
        return messageDelete
    }
}

export { CategoryService }