import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { BookingModule } from './booking/booking.module';
import { UserEntity } from './users/entity/user.entity';
import { VehicleEntity } from './vehicles/entity/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'luxury-rides',
      entities: [UserEntity,VehicleEntity],
      synchronize: true,
    })
    ,UsersModule, 
    AuthModule, 
    VehiclesModule, 
    BookingModule
  ]
})
export class AppModule {}
