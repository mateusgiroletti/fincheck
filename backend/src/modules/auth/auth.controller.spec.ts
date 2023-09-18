import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../shared/database/repositories/user.repositorie';
import { PrismaService } from '../../shared/database/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    const token = { token: 'token' };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        signin: jest.fn().mockResolvedValue(token),
                        signup: jest.fn().mockResolvedValue(token),
                    },
                },
                JwtService,
                UserRepository,
                PrismaService,
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
        expect(authService).toBeDefined();
    });

    describe('signin', () => {
        const userLogin = { email: 'test@email.com', password: '1234568' };

        it('should return a jwt token', async () => {
            // Call the controller method
            const result = await authController.signin(userLogin);

            // Assert the result
            expect(result).toEqual(token);
            expect(authService.signin).toHaveBeenCalledWith(userLogin);
        });

        it('should throw an exception', () => {
            jest.spyOn(authService, 'signin').mockRejectedValueOnce(
                new Error(),
            );

            expect(authController.signin(userLogin)).rejects.toThrowError();
        });
    });

    describe('signup', () => {
        const newUser = {
            name: 'testing',
            email: 'test@email.com',
            password: '1234568',
        };

        it('should return a jwt token', async () => {
            // Call the controller method
            const result = await authController.create(newUser);

            // Assert the result
            expect(result).toEqual(token);
            expect(authService.signup).toHaveBeenCalledWith(newUser);
        });

        it('should throw an exception', () => {
            jest.spyOn(authService, 'signup').mockRejectedValueOnce(
                new Error(),
            );

            expect(authController.create(newUser)).rejects.toThrowError();
        });
    });
});
