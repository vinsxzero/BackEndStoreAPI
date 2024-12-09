import { getCustomRepository } from "typeorm";
import { IClientRequest } from "../interface/IClientRequest";
import { ClientRepositories } from "../repositories/clientRepositories";

class ClientService{
    async createClient({name, cpf, address, phone}: IClientRequest){
        const clientRepositories = getCustomRepository(ClientRepositories)
        const client = clientRepositories.create({
            name,
            cpf,
            address,
            phone,
        })

        // Método que address e salva tupla no address
        await clientRepositories.save(client);
        return client
    }

    
    async listClients(){
        const clientRepositories = getCustomRepository(ClientRepositories);
        const clients = await clientRepositories
        .createQueryBuilder("client")
        .getMany()
        return clients
    }


    async updateClient({id, name, cpf, address, phone}: IClientRequest){
        const clientRepositories = getCustomRepository(ClientRepositories)
        
        const client = await clientRepositories.findOne({
            id,
        });
        if(!client){
            throw new Error("Client does not exist")
        }

        client.name = name
        client.cpf = cpf
        client.address = address
        client.phone = phone
        
        const res = await clientRepositories.update(id, client)
        return res
    }


    async deleteClient(id:any){
        if(!id){
            throw new Error("Id error")
        }
        const clientRepositories = getCustomRepository(ClientRepositories)
        
        const client = await clientRepositories.findOne({
            id,
        })
        if(!client){
            throw new Error("Client not found")
        }

        await clientRepositories.delete(id);
        var messageDelete = {
            message: "Registro excluido com sucesso"
        }
        return messageDelete
    }
}

export { ClientService }