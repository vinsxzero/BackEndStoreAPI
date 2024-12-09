import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { profile } from "console";

class UserController{

    // Inserir novo usuário
    async createUser(request: Request, response: Response) {
        const {name, email, admin, password, clientId, profileId} = request.body;
        const user =
        {
            name:name,
            email:email,
            admin:admin,
            clientId: clientId,
            password:password,
            profileId:profileId
        };
        const userService = new UserService()
        const ret =  await userService.createUser(user)
        return response.json(ret);
    }


    async listUsers(req,res) {
        const userService = new UserService()
        const users = await userService.listUsers();
        return res.json(users);
    }


    async updateUser(request: Request, response: Response) {
        const {name, email, admin, password, clientId, profile } = request.body;
        const id = request.params.id;
        const user = 
    {
        id: id,
        name:name,
        email:email,
        admin:admin,
        password:password,
        clientId:clientId,
        profile:profile
    };
    const userService = new UserService()
    const ret =  await userService.updateUser(user)
    return response.json(ret);
    }


    async deleteUser(request: Request, response: Response) {
        const id = request.params.id;
    
        const userService = new UserService()
        const ret =  await userService.deleteUser(id)
    
        return response.json(ret)
      }
}

export { UserController }