// src/group/group.service.ts

import { Injectable } from '@nestjs/common';
import { Group } from './group.interface'; // Import the interface

@Injectable()
export class GroupService {
  private groups: Group[] = [];

  findAll(): Group[] {
    return this.groups;
  }

  create(groupData: Group): Group {
    this.groups.push(groupData);
    return groupData;
  }
}
