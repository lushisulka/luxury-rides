import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleEntity } from './entity/vehicle.entity';
import { Repository } from 'typeorm';
import { VehicleDto } from './dto/vehicle.dto';


@Injectable()
export class VehiclesService {
    constructor(@InjectRepository(VehicleEntity) private readonly vehicleRepository: Repository<VehicleEntity>) { }

    public async createVehicle(data: VehicleDto): Promise<VehicleEntity> {
        try {
            return await this.vehicleRepository.save(data);
        } catch (e) {
            console.log(e);
                throw new HttpException('Error creating vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
