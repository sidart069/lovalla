import { GroupService } from './group.service';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    getAllGroups(): import("./group.interface").Group[];
    createGroup(groupData: any): import("./group.interface").Group;
}
