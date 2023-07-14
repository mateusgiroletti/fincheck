import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UserService {
    constructor(private readonly usersRepo: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
        const { name, email, password } = createUserDto;

        const emailTaken = await this.usersRepo.findUnique({
            where: { email },
            select: { id: true },
        });

        if (emailTaken) {
            throw new ConflictException('This email is already in use.');
        }

        const hashedPassword = await hash(password, 12);

        const newUser = await this.usersRepo.create({
            data: { name, email, password: hashedPassword },
        });

        return {
            name: newUser.name,
            email: newUser.email,
        };
    }
}
