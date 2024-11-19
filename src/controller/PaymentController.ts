import { Request, Response } from "express";
import { PaymentService } from "../service/PaymentService";
import { isDate } from "util";

class PaymentController{
    async createPayment(request: Request, response: Response){
        const {date, valor, metododePagamento, status, parcelamento} = request.body
        const payment = 
        {
         date:date,
         valor:valor,
         metododePagamento: metododePagamento,
         status:status,
         parcelamento:parcelamento   
        }
        const paymentService = new PaymentService()
        const res = await paymentService.createPayment(payment)
        return response.json(res)
    }

    async listPayment(request:Request, response:Response){
        const paymentService = new PaymentService()
        const payment = await paymentService.listPayment()

        const res = response.json(payment)
        return res
    }

    async deletePayment(request:Request, response:Response){
        const id = request.params.id
        const paymentService = new PaymentService()

        const res = await paymentService.deletePayment(id)
        return response.json(res)
    }

    async updatePayment(request:Request, response: Response){
        const {date, valor, metododePagamento, status, parcelamento} = request.body()
        const id = request.params.id

        const payment = {
            id:id,
            date: date,
            valor: valor,
            metododePagamento: metododePagamento,
            status: status,
            parcelamento: parcelamento
        }
        const paymentService = new PaymentService()
        const res = await paymentService.updatePayment(payment)
        return response.json(res)
    }
}
export {PaymentController}

