import { Controller, Post, Body } from '@nestjs/common';
import { MatchingService } from './matching.service';

interface UserProfile {
  id: number;
  username: string;
  personality: string;
}

@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  // POST /matching - Accepts an array of user profiles and returns groups
  @Post()
  match(@Body() users: UserProfile[]): Record<string, UserProfile[]> {
    return this.matchingService.matchUsers(users);
  }
}
