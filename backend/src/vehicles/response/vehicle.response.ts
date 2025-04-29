import { VehicleEntity } from "../entity/vehicle.entity";

export interface VehicleResponse {
  status: 200,
  message: string,
  data: VehicleEntity
}


export interface GetVehiclesResponse {
  status: 200,
  message: string,
  data: VehicleEntity[]
}

export interface UpdateVehicleResponse {
  status: 200,
  message: string,
  data: VehicleEntity
}

export interface DeleteVehiclesResponse {
  status: 200,
  message: string,
}