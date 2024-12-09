import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IAuthenticateRequest } from "../interface/IAuthenticateRequest";
import { UserRepositories } from "../repositories/userRepositories";

// ES Modules
import { getCustomRepository } from "typeorm";

class AuthenticateUserService {
    publicKey = "UMC-EngSoftware-2024"
    async authenticateUser({email, password}: IAuthenticateRequest){
        const userRepositories = getCustomRepository(UserRepositories)
        const user = await userRepositories.findOne({
            email
        })
        if(!user){
            throw new Error("User not found")
        }

        const passwordHash = user.password
        const passwordMatch = await compare(password, passwordHash);

        if (!passwordMatch) {
            throw new Error ("Senha ou e-mail incorreto");
        }
        
        
        //Gerar token
        const token = sign(
            {
                email: email, 
            },
            this.publicKey,
            {
                subject: ("others"),
                expiresIn: "2h",
            }
        );

        //Decodificar o token para acessar o tempo de expiração em segundos
        var jwt = require('jsonwebtoken');
        const tokenInfo = jwt.decode(token);
        const expTime = tokenInfo.exp * 1000

        // Criar novo objeto date com a diferença do tempo de expiração
        const expDate = new Date(expTime)        

        return {token: token, exp: expDate};
    }


}

export { AuthenticateUserService };