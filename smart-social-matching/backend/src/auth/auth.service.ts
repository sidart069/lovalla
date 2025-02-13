// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // Temporary in-memory user store (for demo purposes only)
  private users: any[] = [];

  constructor(private jwtService: JwtService) {}

  // Sign up a new user (dummy implementation)
  async signUp(createUserDto: any): Promise<any> {
    // In a real application, validate input, hash the password, etc.
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  // Login a user and return a JWT token
  async login(loginDto: any): Promise<string> {
    // Find user by username and password (dummy validation)
    const user = this.users.find(
      (u) => u.username === loginDto.username && u.password === loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create JWT payload
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }
}
