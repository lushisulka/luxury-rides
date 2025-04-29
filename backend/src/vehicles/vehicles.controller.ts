import { Controller, Post, Get, Body, Put, HttpException, HttpStatus, ParseIntPipe, Param, Delete } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehicleDto } from './dto/vehicle.dto';
import { VehicleResponse, GetVehiclesResponse, DeleteVehiclesResponse, UpdateVehicleResponse } from './response/vehicle.response';

@Controller('vehicles')
export class VehiclesController {

    constructor(private readonly vehiclesService: VehiclesService) { }

    @Post('create')
    public async createVehicle(@Body() bodyParam: VehicleDto): Promise<VehicleResponse> {
        try {
            const result = await this.vehiclesService.create(bodyParam);
            return {
                status: 200,
                message: "Vehicle created succesfully",
                data: result
            }
        } catch (e) {
            console.log(e);
            throw new HttpException('Error creating vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('all')
    public async getVehicles(): Promise<GetVehiclesResponse> {
        try {
            const result = await this.vehiclesService.getAll();
            return {
                status: 200,
                message: "Vehicle exists succesfully",
                data: result
            }
        } catch (error) {
            throw new HttpException('Error creating vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    public async getVehicleById(@Param('id', ParseIntPipe) id: number): Promise<VehicleResponse> {
        try {
            const result = await this.vehiclesService.getById(id);
            return {
                status: 200,
                message: "Vehicle exists",
                data: result
            }
        } catch (error) {
            throw new HttpException('Error creating vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Put(':id')
    public async updateVehicle(@Param('id', ParseIntPipe) id: number, @Body() updateData: VehicleDto): Promise<UpdateVehicleResponse> {
        try {
            const result = await this.vehiclesService.updateById(id, updateData);
            return {
                status: 200,
                message: "Vehicle updated successfully",
                data: result
            }
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }




    @Delete(':id')
    public async deleteVehicle(@Param('id', ParseIntPipe) id: number): Promise<DeleteVehiclesResponse> {
        try {
            return await this.vehiclesService.deleteById(id);
        } catch (error) {
            throw new HttpException('Vehicle was not deleted', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}