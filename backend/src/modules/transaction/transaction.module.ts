import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './transaction.controller';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { CategoryModule } from '../category/category.module';
import { ValidateTransactionOwnershipService } from './services/validate-transaction-ownership.service';

@Module({
    imports: [BankAccountModule, CategoryModule],
    controllers: [TransactionController],
    providers: [TransactionService, ValidateTransactionOwnershipService],
})
export class TransactionModule {}
