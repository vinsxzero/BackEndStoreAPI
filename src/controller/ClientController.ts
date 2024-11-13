import { Request, Response } from "express";
import { ClientService } from "../service/ClientService";

class ClientController{
    async createClient(request: Request, response: Response) {
        const {name, description, cpf, address, phone } = request.body;
        const client = 
        {
            name:name,
            description:description,
            cpf:cpf,
            address:address,
            phone:phone
        };
        const clientService = new ClientService()
        const res =  await clientService.createClient(client)
        return response.json(res);
    }


    async listClients(request: Request, response: Response){
        const clientService = new ClientService()
        const clients = await clientService.listClients()

        const res = response.json(clients)
        return res
    }


    async updateClient(request: Request, response: Response) {
        const {name, description, cpf, address, phone } = request.body;

        const id = request.params.id;

        const client = 
        {
            id: id,
            name:name,
            description:description,
            cpf:cpf,
            address:address,
            phone:phone
        };
        const clientService = new ClientService()
        const res =  await clientService.updateClient(client)
        return response.json(res);
    }


    async deleteClient(request: Request, response: Response){
        const id = request.params.id
        const clientService = new ClientService()

        const res = await clientService.deleteClient(id)
        return response.json(res)
    }
}

export { ClientController }