interface IProductRequest {
    id?: string;
    name: string;
    description?:string;
    price: number;
    categoryId: string;
}

    export{ IProductRequest }