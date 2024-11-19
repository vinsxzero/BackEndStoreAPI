interface IPaymentRequest{
    id?: string;
    date: Date;
    valor: number;
    metododePagamento: string
    status: string;
    parcelamento: number
}
export {IPaymentRequest}