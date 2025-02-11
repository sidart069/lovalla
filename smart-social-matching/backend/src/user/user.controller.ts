
// This controller defines an endpoint at /user that, 
// when accessed via a GET request, will return the list of users. 

import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): string[] {
    return this.userService.getUsers();
  }
}
