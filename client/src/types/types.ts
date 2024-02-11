export interface IUser {
    id: number;
    email: string;
    token: string;
}

export interface IUserData {
    email: string;
    password: string;
}

export interface IResponseUser {
    email: string;
    password: string;
    id: number;
    createdAt: string;
    updatedAt: string;
}

export interface IResponseUserData {
    token: string;
    user: IResponseUser;
}

export interface ITrain {
    startCity: string;
    endCity: string;
    departure: string;
    arrival: string;
    availableSeats: number;
    price: number;
}

export interface ITrainData {
    id: number;
    startCity: string;
    endCity: string;
    departure: string;
    arrival: string;
    availableSeats: number;
    price: number;
}

export interface IResponseTrain {
    startCity: string;
    endCity: string;
    departure: string;
    arrival: string;
    availableSeats: number;
    price: number;
    id: number;
    createdAt: string;
    updatedAt: string;
}

export interface IResponseTrainData {
    train: IResponseTrain;
}