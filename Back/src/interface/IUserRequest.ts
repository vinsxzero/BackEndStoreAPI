interface IUserRequest {
    id?: string;
    name: string;
    email:string;
    admin?: boolean;
    password: string;
    clientId?: string;
    profileId?: string;
}

    export{ IUserRequest }