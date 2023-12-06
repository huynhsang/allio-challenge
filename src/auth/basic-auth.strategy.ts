import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';
import { AuthService } from './auth.service';

/**
 * The basic auth strategy
 */
@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * Validate username and password after decoded base64 from authorization header
   *
   * @param username The username of user
   * @param password The password of user
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
