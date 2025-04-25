import { Controller, Post, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehicleDto } from './dto/vehicle.dto';

@Controller('vehicles')
export class VehiclesController {

    constructor(private readonly vehiclesService: VehiclesService) { }

    @Post('create')
    public async createVehicle(@Body() bodyParam: VehicleDto) {
        try {
            const vehicle = await this.vehiclesService.createVehicle(bodyParam);
            return vehicle;
        } catch (e) {
            console.log(e);
                throw new HttpException('Error creating vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('all')
    public getVehicles() {

    }
}
