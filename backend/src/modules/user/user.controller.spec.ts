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

    // Mock the LoggedUserId decorator
    const loggedUserIdDecorator = jest.fn().mockReturnValue(userId);

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
        expect(userService).toBeDefined();
    });

    describe('me', () => {
        it('should return user informations', async () => {
            // Call the controller method
            const result = await userController.me(loggedUserIdDecorator());

            // Assert the result
            expect(result).toEqual(user);
            expect(loggedUserIdDecorator).toHaveBeenCalled();
            expect(userService.getUserById).toHaveBeenCalledWith(userId);
        });

        it('should throw an exception', () => {
            jest.spyOn(userService, 'getUserById').mockRejectedValueOnce(
                new Error(),
            );

            expect(
                userController.me(loggedUserIdDecorator()),
            ).rejects.toThrowError();
        });
    });
});
