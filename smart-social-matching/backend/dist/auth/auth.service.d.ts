import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private users;
    constructor(jwtService: JwtService);
    signUp(createUserDto: any): Promise<any>;
    login(loginDto: any): Promise<string>;
}
