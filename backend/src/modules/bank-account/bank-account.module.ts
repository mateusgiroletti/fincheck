import { Module } from '@nestjs/common';
import { BankAccountService } from './services/bank-account.service';
import { BankAccountController } from './bank-account.controller';
import { ValidateBankAccountOwnershipService } from './services/validate-bank-account-ownership.service';

@Module({
    controllers: [BankAccountController],
    providers: [BankAccountService, ValidateBankAccountOwnershipService],
    exports: [ValidateBankAccountOwnershipService],
})
export class BankAccountModule {}
