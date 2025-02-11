import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers(): string[] {
    // Replace with actual user retrieval logic later
    return ['Ishika', 'Sid', 'Pratha'];
  }
}
