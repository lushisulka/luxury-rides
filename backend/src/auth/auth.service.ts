import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceHandler } from 'src/errorHandler/service.error';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  public async authUserId(request: Request): Promise<number> {
    try {
      const jwt = request.cookies?.jwt;
      if (!jwt) {
        throw new ServiceHandler("You are anauthorized", HttpStatus.UNAUTHORIZED);
      }

      const decodedToken: any = this.jwtService.decode(jwt);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        throw new HttpException("Token expired", HttpStatus.UNAUTHORIZED);
      }
      const { id } = await this.jwtService.verifyAsync(jwt);
      return id;
    } catch (error) {
      throw new ServiceHandler(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
