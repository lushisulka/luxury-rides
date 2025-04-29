import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleEntity } from './entity/vehicle.entity';
import { Repository } from 'typeorm';
import { VehicleDto } from './dto/vehicle.dto';
import { DeleteVehiclesResponse } from './response/vehicle.response';

@Injectable()
export class VehiclesService {
    constructor(@InjectRepository(VehicleEntity) private readonly vehicleRepository: Repository<VehicleEntity>) { }

    public async create(data: VehicleDto): Promise<VehicleEntity> {
        try {
            return await this.vehicleRepository.save(data);
        } catch (e) {
            console.log(e);
            throw new HttpException('Error creating vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getAll(): Promise<VehicleEntity[]> {
        try {
            return await this.vehicleRepository.find();
        } catch (e) {
            console.log(e);
            throw new HttpException('Error creating vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public async updateById(id: number, updateData: VehicleDto): Promise<VehicleEntity> {
        try {
            const result = await this.vehicleRepository.findOne({ where: { id } });
            if (!result) {
                throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
            }
            await this.vehicleRepository.update(id, updateData);
            const updatedVehicle = await this.vehicleRepository.findOne({ where: { id } });
            if (!updatedVehicle) {
                // This is very unlikely, but safe to check
                throw new HttpException('Failed to retrieve updated vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return updatedVehicle;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    public async getById(id: number): Promise<VehicleEntity> {
        try {
            const result = await this.vehicleRepository.findOne({ where: { id } });
            if (!result) {
                throw new HttpException('This vehicle was not found', HttpStatus.NOT_FOUND);
            }
            return result;
        } catch (e) {
            console.log(e);
            throw new HttpException('Error creating vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async deleteById(id: number): Promise<DeleteVehiclesResponse> {
        try {
            const result = await this.vehicleRepository.findOne({ where: { id } });
            if (!result) {
                throw new HttpException('This vehicle was not found', HttpStatus.NOT_FOUND);
            }
            await this.vehicleRepository.delete(id);
            return {
                status: 200,
                message: "This vehicle was deleted successfully",
            }
        } catch (e) {
            console.log(e);
            throw new HttpException('Error creating vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
