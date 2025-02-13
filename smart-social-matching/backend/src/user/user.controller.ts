// src/user/user.controller.ts

import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  // ... existing endpoints

  // Protected endpoint to get current user profile
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: any) {
    // The JwtStrategy's validate() method attaches the user object to req.user.
    return req.user;
  }
}
