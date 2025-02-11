"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
describe('UserController', () => {
    let userController;
    beforeEach(async () => {
        const app = await testing_1.Test.createTestingModule({
            controllers: [user_controller_1.UserController],
            providers: [user_service_1.UserService],
        }).compile();
        userController = app.get(user_controller_1.UserController);
    });
    describe('getAllUsers', () => {
        it('should return an array of users', () => {
            expect(userController.getAllUsers()).toEqual(['Ishika', 'Sid', 'Pratha']);
        });
    });
});
//# sourceMappingURL=user.controller.spec.js.map