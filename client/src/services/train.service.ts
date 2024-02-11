import { ITrain, IResponseTrain, IResponseTrainData } from './../types/types';
import { instance } from "../api/axios.api";

export const TrainService = {
    async getTrainList(): Promise<IResponseTrainData | undefined> {
        const { data } = await instance.get<IResponseTrainData>('train');
        return data;
    },
    async getTrainById(id: string): Promise<IResponseTrain | undefined> {
        const { data } = await instance.get<IResponseTrain>(`train/${id}`);
        return data;
    },
    async createTrain(train: any): Promise<ITrain | undefined> {
        const { data } = await instance.post<ITrain>('train', train);
        return data;
    },
    async updateTrain(id: string, train: any): Promise<ITrain | undefined> {
        const { data } = await instance.patch<ITrain>(`train/${id}`, train);
        return data;
    },
    async deleteTrain(id: string): Promise<IResponseTrainData | undefined> {
        const { data } = await instance.delete<IResponseTrainData>(`train/${id}`);
        return data;
    }
}