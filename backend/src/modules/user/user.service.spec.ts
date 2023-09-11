import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../../shared/database/repositories/user.repositorie';
import { PrismaService } from '../../shared/database/prisma.service';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, UserRepository, PrismaService],
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('getUserById', () => {
        it('should return a user by ID', async () => {
            // Mock the behavior of UserRepository's findUnique method
            const mockUser = {
                id: '1',
                name: 'Name',
                email: 'name@example.com',
                password: 'password123',
            };

            jest.spyOn(userRepository, 'findUnique').mockResolvedValue(
                mockUser,
            );

            // Call the getUserById method with a user ID
            const userId = '1';
            const user = await userService.getUserById(userId);

            // Assert that the service returns the expected user
            expect(user).toEqual(mockUser);

            // Assert that the findUnique method of UserRepository was called with the correct parameters
            expect(userRepository.findUnique).toHaveBeenCalledWith({
                where: { id: userId },
                select: { name: true, email: true },
            });
        });
    });
});
