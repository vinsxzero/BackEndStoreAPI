import { EntityRepository, Repository } from "typeorm";
import { Vendor } from "../entities/vendor";
@EntityRepository(Vendor)
class VendorRepositories extends Repository<Vendor> {}

export { VendorRepositories };