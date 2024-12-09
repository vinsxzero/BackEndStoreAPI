import { EntityRepository, Repository } from "typeorm";
import { Profile } from "../entities/profile";

@EntityRepository(Profile)
class ProfileRepositories extends Repository<Profile> {}

export { ProfileRepositories };