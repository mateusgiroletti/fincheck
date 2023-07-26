import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repositorie';
import { CategoryRepository } from './repositories/category.repositorie';
import { BankAccountRepository } from './repositories/bank-account.repositorie';

@Global()
@Module({
    providers: [
        PrismaService,
        UserRepository,
        CategoryRepository,
        BankAccountRepository,
    ],
    exports: [UserRepository, CategoryRepository, BankAccountRepository],
})
export class DatabaseModule {}
