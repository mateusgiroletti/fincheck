import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin';
import { SignupDto } from './dto/signup';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepo: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async signin(signinDto: SigninDto) {
        const { email, password } = signinDto;

        const user = await this.usersRepo.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const accessToken = await this.generateAccessToken(user.id);

        return { accessToken };
    }

    async signup(signupDto: SignupDto) {
        const { name, email, password } = signupDto;

        const emailTaken = await this.usersRepo.findUnique({
            where: { email },
            select: { id: true },
        });

        if (emailTaken) {
            throw new ConflictException('This email is already in use.');
        }

        const hashedPassword = await hash(password, 12);

        const user = await this.usersRepo.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const accessToken = await this.generateAccessToken(user.id);

        return { accessToken };
    }

    private generateAccessToken(userId: string) {
        return this.jwtService.signAsync({ sub: userId });
    }
}
