import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ServiceHandler } from 'src/errorHandler/service.error';
import { RegisterDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) { }

  public async findByEmail(email: string): Promise<any> {
    try {
      const result = await this.usersRepository.findOneBy({ email });
      return result;
    } catch (error) {
      throw new ServiceHandler(error.message, HttpStatus.NOT_FOUND);
    }
  }

  public async registerUser(data: RegisterDto): Promise<UserEntity> {
    try {
      const result = await this.usersRepository.save(data);
      return result;
    } catch (error) {
      throw new ServiceHandler(error.message, HttpStatus.NOT_FOUND);
    }
  }

  public async findById(id: number): Promise<UserEntity[]> {
    try {
      const result = await this.usersRepository.findBy({ id });
      return result;
    } catch (error) {
      throw new ServiceHandler(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
