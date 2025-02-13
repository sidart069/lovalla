import { MatchingService } from './matching.service';
interface UserProfile {
    id: number;
    username: string;
    personality: string;
}
export declare class MatchingController {
    private readonly matchingService;
    constructor(matchingService: MatchingService);
    match(users: UserProfile[]): Record<string, UserProfile[]>;
}
export {};
