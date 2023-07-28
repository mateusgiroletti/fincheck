import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repositorie';
import { CategoryRepository } from './repositories/category.repositorie';
import { BankAccountRepository } from './repositories/bank-account.repositorie';
import { TransactionRepository } from './repositories/transaction.repositorie';

@Global()
@Module({
    providers: [
        PrismaService,
        UserRepository,
        CategoryRepository,
        BankAccountRepository,
        TransactionRepository,
    ],
    exports: [
        UserRepository,
        CategoryRepository,
        BankAccountRepository,
        TransactionRepository,
    ],
})
export class DatabaseModule {}
