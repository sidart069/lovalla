import { Group } from './group.interface';
export declare class GroupService {
    private groups;
    findAll(): Group[];
    create(groupData: Group): Group;
}
