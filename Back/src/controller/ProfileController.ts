import { Request, Response } from "express";
import { ProfileService } from "../service/ProfileService"

class ProfileController {
    async createProfile(request: Request, response: Response) {
    const { name } = request.body;
    const profile = 
    {
        name:name,
        };    
        const execute= new ProfileService()
        const ret= await execute.createProfile(profile)
        return response.json(ret);
    }

    async listProfile(request: Request, response: Response) {    
        const listuserService= new ProfileService()
    const ret= await listuserService.listProfile()
    return response.json(ret);
    }
    async findById(request: Request, response: Response) {
        const id= request.params.id;
        const listuserService= new ProfileService()
        const ret= await listuserService.findById(id)
        return response.json(ret);

    }
}

export { ProfileController };