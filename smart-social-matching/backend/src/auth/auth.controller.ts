import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: any) {
    // Implement your user registration logic
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: any) {
    const token = await this.authService.login(loginDto);
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { access_token: token };
  }
}
