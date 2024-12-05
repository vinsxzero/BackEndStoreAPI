import { IProfileRequest } from "../interface/IProfileRequest";
import { ProfileRepositories } from "../repositories/profileRepositories";
import { getCustomRepository } from "typeorm";
class ProfileService {
  async createProfile({ name }: IProfileRequest) {
    if (!name) {
        throw new Error("Nome Obrigatorio");
    }
    const profileRepositories = getCustomRepository(ProfileRepositories);
    const profile = profileRepositories.create(
    {
        name,
    });
        await profileRepositories.save(profile);  
        return profile;
    }
    async listProfile(){
        const profileRepositories = getCustomRepository(ProfileRepositories);
        const users = await profileRepositories
        .createQueryBuilder("profile").getMany();
        return  users;
    }

    async findById(id) {
        const profileRepositories = getCustomRepository(ProfileRepositories);
        const users = await profileRepositories.findOne({id:id});
        return  users;

    }
}  

export { ProfileService };

