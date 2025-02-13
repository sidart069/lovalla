import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(createUserDto: any): Promise<any>;
    login(loginDto: any): Promise<{
        access_token: string;
    }>;
}
