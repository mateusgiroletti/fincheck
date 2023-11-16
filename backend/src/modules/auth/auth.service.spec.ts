import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from '../../shared/database/repositories/user.repositorie';
import { PrismaService } from '../../shared/database/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
    let authService: AuthService;
    let userRepository: UserRepository;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, UserRepository, JwtService, PrismaService],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        userRepository = module.get<UserRepository>(UserRepository);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(jwtService).toBeDefined();
    });

    /* describe('findAll', () => {
        it('should return all categories where userId is null', async () => {
            const mockCategory = [
                {
                    id: '1',
                    userId: null,
                    name: 'cat',
                    icon: 'icon',
                    type: TransactionType.INCOME,
                    isCustom: false,
                },
            ];

            jest.spyOn(categoryRepository, 'findMany').mockResolvedValue(
                mockCategory,
            );

            const category = await categoryService.findAll();

            // Assert that the service returns the expected user
            expect(category).toEqual(mockCategory);

            // Assert that the findMany method of CategoryRepository was called with the correct parameters
            expect(categoryRepository.findMany).toHaveBeenCalledWith({
                where: { userId: null },
            });
        });
    }); */
});
