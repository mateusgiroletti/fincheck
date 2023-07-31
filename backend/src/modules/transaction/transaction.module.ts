import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { CategoryModule } from '../category/category.module';

@Module({
    imports: [BankAccountModule, CategoryModule],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}
