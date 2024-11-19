import { getCustomRepository } from "typeorm";
import { IPaymentRequest } from "../interface/IPaymentRequest";
import { PaymentRepositories } from "../repositories/paymentRepositories";
import { IncomingMessage } from "http";
import { Payment } from "../entities/payment";

class PaymentService{
    async createPayment({date, valor, metododePagamento, status, parcelamento}){
        const paymentRepositories= getCustomRepository(PaymentRepositories)
        const payment = paymentRepositories.create({
            date,
            valor,
            metododePagamento,
            status,
            parcelamento
        })
        await paymentRepositories.save(payment)

        return payment
    }

    async listPayment(){
        const paymentRepositories = getCustomRepository(PaymentRepositories)
        const payment = await paymentRepositories.createQueryBuilder("payment")
        .getMany()
        return payment
    }

    async updatePayment({id, date, valor, metododePagamento, status, parcelamento}){
        const paymentRepositories = getCustomRepository(PaymentRepositories)
        const payment = await paymentRepositories.findOne({id})
        if(!id){
            throw new Error("Pagamento nao encontrado")
        }

        payment.date = date
        payment.valor = valor
        payment.metododePagamento = metododePagamento
        payment.status = status
        payment.parcelamento = parcelamento
        const res = await paymentRepositories.update(id, payment)
        return res
    }
    async deletePayment(id:any){
        const paymentRepositories = getCustomRepository(PaymentRepositories)
        const payment = await paymentRepositories.findOne({id})
        if(!id){
            throw new Error("Pagamento Nao encontrado.")
        }

        await paymentRepositories.delete({id})
        var messageDelete = {
            message: "Registro excluído com sucesso"
        }
        return messageDelete
    }
}
export {PaymentService}