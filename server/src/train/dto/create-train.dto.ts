import { IsNotEmpty } from "class-validator";

export class CreateTrainDto {
    @IsNotEmpty({message: 'Cant be empty'})
    startCity: string
    endCity: string
    dispatch: string
    arrival: string
}
