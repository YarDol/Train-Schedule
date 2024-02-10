import { IsDateString, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateTrainDto {
    // @IsString()
    // @Min(3)
    // @Max(25)
    startCity: string

    // @IsString()
    // @Min(3)
    // @Max(25)
    endCity: string

    @IsDateString()
    departure: Date

    @IsDateString()
    arrival: Date

    // @IsNumber()
    // @Min(0)
    // @Max(500)
    availableSeats: number

    // @IsNumber()
    // @Min(0)
    // @Max(5000)
    price: number;
}
