import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user";

@EntityRepository(User)
class UserRepositories extends Repository<User> {}

export { UserRepositories };