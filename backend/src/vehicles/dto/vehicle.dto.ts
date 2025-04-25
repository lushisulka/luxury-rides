import { IsString, IsInt, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class VehicleDto {
    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsNumber()
    @IsNotEmpty()
    year: number;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsBoolean()
    @IsNotEmpty()
    available: boolean;

    @IsString()
    @IsNotEmpty()
    description: string;
}