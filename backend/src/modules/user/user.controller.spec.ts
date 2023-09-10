import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from '../../shared/database/repositories/user.repositorie';
import { PrismaService } from '../../shared/database/prisma.service';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    const userId = 'testUserId';
    const user = { id: userId, name: 'Test User' };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        getUserById: jest.fn().mockResolvedValue(user),
                    },
                },
                UserRepository,
                PrismaService,
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userController).toBeDefined();
    });

    describe('me', () => {
        it('should return user informations', async () => {
            // Mock the LoggedUserId decorator
            const loggedUserIdDecorator = jest.fn().mockReturnValue(userId);

            // Call the controller method
            const result = await userController.me(loggedUserIdDecorator());

            // Assert the result
            expect(result).toEqual(user);
            expect(loggedUserIdDecorator).toHaveBeenCalled();
            expect(userService.getUserById).toHaveBeenCalledWith(userId);
        });
    });
});
