import { Injectable } from '@nestjs/common';

interface UserProfile {
  id: number;
  username: string;
  personality: string; // e.g., "Extrovert", "Introvert"
  // Add additional fields as needed (e.g., compatibility score)
}

@Injectable()
export class MatchingService {
  // Simulate a matching algorithm: group users by personality type
  matchUsers(users: UserProfile[]): Record<string, UserProfile[]> {
    const groups: Record<string, UserProfile[]> = {};
    users.forEach((user) => {
      const key = user.personality; // Grouping key
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(user);
    });
    return groups;
  }
}
