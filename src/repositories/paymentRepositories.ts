import { EntityRepository, Repository } from "typeorm";
import { Payment } from "../entities/payment";

@EntityRepository(Payment)
class PaymentRepositories extends Repository<Payment> {}

export { PaymentRepositories };