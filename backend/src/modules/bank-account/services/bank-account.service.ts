import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from '../../../shared/database/repositories/bank-account.repositorie';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
    constructor(
        private readonly bankAccountsRepo: BankAccountsRepository,
        private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    ) {}

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
                user: true,
                Transaction: {
                    select: {
                        type: true,
                        value: true,
                        id: true,
                    },
                },
            },
        });

        return bankAccounts.map(({ Transaction, ...bankAccount }) => {
            const totalTransactions = Transaction.reduce(
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
                ...bankAccounts,
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
