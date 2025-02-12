// src/group/group.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // GET /group
  @Get()
  getAllGroups() {
    return this.groupService.findAll();
  }

  // POST /group
  @Post()
  createGroup(@Body() groupData: any) {
    return this.groupService.create(groupData);
  }
}
