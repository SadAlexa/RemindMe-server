import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtDecodeService {
  constructor(private readonly jwtService: JwtService) {}

  async decodeToken(token: string): Promise<any> {
    const bearerPrefix = 'Bearer ';
    if (token.startsWith(bearerPrefix)) {
      token = token.substring(bearerPrefix.length);
    }
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      }
      throw error;
    }
  }
}
