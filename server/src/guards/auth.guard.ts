import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { accessTokenConfig } from 'src/auth/jwt-config/jwt.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (!token || type !== 'Bearer') {
      throw new UnauthorizedException('Invalid token or token type');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: accessTokenConfig.secret,
      });

      req['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid token or token type');
    }
    return true;
  }
}
