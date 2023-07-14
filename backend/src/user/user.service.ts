import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const { name, email, password } = createUserDto;

        const emailTaken = await this.prismaService.user.findUnique({
            where: { email },
            select: { id: true },
        });

        if (emailTaken) {
            throw new ConflictException('This email is already in use.');
        }

        const hashedPassword = await hash(password, 12);

        const newUser = await this.prismaService.user.create({
            data: { name, email, password: hashedPassword },
        });

        return newUser;
    }
}
