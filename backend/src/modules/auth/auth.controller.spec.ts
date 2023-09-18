import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../shared/database/repositories/user.repositorie';
import { PrismaService } from '../../shared/database/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin';
import { SignupDto } from './dto/signup';

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
        const signinDto: SigninDto = {
            email: 'test@mail.com',
            password: 'password',
        };

        it('should return a jwt token', async () => {
            // Call the controller method
            const result = await authController.signin(signinDto);

            // Assert the result
            expect(result).toEqual(token);
            expect(authService.signin).toHaveBeenCalledWith(signinDto);
        });

        it('should throw an exception', () => {
            jest.spyOn(authService, 'signin').mockRejectedValueOnce(
                new Error(),
            );

            expect(authController.signin(signinDto)).rejects.toThrowError();
        });
    });

    describe('signup', () => {
        const signupDto: SignupDto = {
            name: 'test',
            email: 'test@mail.com',
            password: 'password',
        };

        it('should return a jwt token', async () => {
            // Call the controller method
            const result = await authController.create(signupDto);

            // Assert the result
            expect(result).toEqual(token);
            expect(authService.signup).toHaveBeenCalledWith(signupDto);
        });

        it('should throw an exception', () => {
            jest.spyOn(authService, 'signup').mockRejectedValueOnce(
                new Error(),
            );

            expect(authController.create(signupDto)).rejects.toThrowError();
        });
    });
});
