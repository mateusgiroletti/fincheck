import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) {}

    async getUserById(userId: string) {
        const user = await this.userRepo.findUnique({
            where: { id: userId },
            select: { name: true, email: true },
        });

        return user;
    }
}
