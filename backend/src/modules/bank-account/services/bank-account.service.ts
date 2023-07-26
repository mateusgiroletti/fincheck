import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountRepository } from 'src/shared/database/repositories/bank-account.repositorie';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountService {
    constructor(
        private readonly bankAccountRepo: BankAccountRepository,
        private readonly validateBankAccountOnership: ValidateBankAccountOwnershipService,
    ) {}

    create(userId: string, createBankAccountDto: CreateBankAccountDto) {
        const { color, initialBalance, name, type } = createBankAccountDto;

        return this.bankAccountRepo.create({
            data: {
                userId,
                color,
                initialBalance,
                name,
                type,
            },
        });
    }

    findAllByUserId(userId: string) {
        return this.bankAccountRepo.findMany({
            where: {
                userId,
            },
        });
    }

    update(
        userId: string,
        bankAccountId: string,
        updateBankAccountDto: UpdateBankAccountDto,
    ) {
        this.validateBankAccountOnership.validate(userId, bankAccountId);

        const { color, initialBalance, name, type } = updateBankAccountDto;

        return this.bankAccountRepo.update({
            data: {
                color,
                initialBalance,
                name,
                type,
            },
            where: { id: bankAccountId },
        });
    }

    remove(userId: string, bankAccountId: string) {
        this.validateBankAccountOnership.validate(userId, bankAccountId);

        this.bankAccountRepo.delete({
            where: { id: bankAccountId },
        });

        return null;
    }
}
