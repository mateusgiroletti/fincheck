import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repositories';
import { CategoryRepository } from './repositories/category.repositories';

@Global()
@Module({
    providers: [PrismaService, UserRepository, CategoryRepository],
    exports: [UserRepository, CategoryRepository],
})
export class DatabaseModule {}
