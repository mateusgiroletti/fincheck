import { Injectable } from '@nestjs/common';
import { BankAccountRepository } from '../../../shared/database/repositories/bank-account.repositorie';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountService {
    constructor(
        private readonly bankAccountsRepo: BankAccountRepository,
        private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    ) { }

    create(userId: string, createBankAccountDto: CreateBankAccountDto) {
        const { color, initialBalance, name, type } = createBankAccountDto;

        return this.bankAccountsRepo.create({
            data: {
                userId,
                color,
                initialBalance,
                name,
                type,
            },
        });
    }

    async findAllByUserId(userId: string) {
        const bankAccounts = await this.bankAccountsRepo.findMany({
            where: { userId },
            include: {
                transaction: {
                    select: {
                        type: true,
                        value: true,
                    },
                },
            },
        });

        return bankAccounts.map(({ transaction, ...bankAccount }) => {
            const totalTransactions = transaction.reduce(
                (acc, transaction) =>
                    acc +
                    (transaction.type === 'INCOME'
                        ? transaction.value
                        : -transaction.value),
                0,
            );

            const currentBalance =
                bankAccount.initialBalance + totalTransactions;

            return {
                ...bankAccount,
                currentBalance,
            };
        });
    }

    async update(
        userId: string,
        bankAccountId: string,
        updateBankAccountDto: UpdateBankAccountDto,
    ) {
        await this.validateBankAccountOwnershipService.validate(
            userId,
            bankAccountId,
        );

        const { color, initialBalance, name, type } = updateBankAccountDto;

        return this.bankAccountsRepo.update({
            where: { id: bankAccountId },
            data: {
                color,
                initialBalance,
                name,
                type,
            },
        });
    }

    async remove(userId: string, bankAccountId: string) {
        await this.validateBankAccountOwnershipService.validate(
            userId,
            bankAccountId,
        );

        await this.bankAccountsRepo.delete({
            where: { id: bankAccountId },
        });

        return null;
    }
}
