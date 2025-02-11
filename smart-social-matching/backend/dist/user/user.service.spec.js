"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_service_1 = require("./user.service");
describe('UserService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [user_service_1.UserService],
        }).compile();
        service = module.get(user_service_1.UserService);
    });
    it('should return an array of users', () => {
        expect(service.getUsers()).toEqual(['Ishika', 'Sid', 'Pratha']);
    });
});
//# sourceMappingURL=user.service.spec.js.map