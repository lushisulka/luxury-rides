import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('vehicles')
export class VehicleEntity {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 brand: string;

 @Column()
 model: string;

 @Column()
 year: number;

 @Column()
 type: string;

 @Column()
 color:string;

 @Column()
 available: boolean;

 @Column()
 description: string;
}