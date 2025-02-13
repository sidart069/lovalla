interface UserProfile {
    id: number;
    username: string;
    personality: string;
}
export declare class MatchingService {
    matchUsers(users: UserProfile[]): Record<string, UserProfile[]>;
}
export {};
