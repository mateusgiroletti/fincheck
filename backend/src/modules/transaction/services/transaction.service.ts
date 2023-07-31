import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionRepository } from 'src/shared/database/repositories/transaction.repositorie';
import { ValidateBankAccountOwnershipService } from '../../bank-account/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../category/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionService {
    constructor(
        private readonly transactionRepo: TransactionRepository,
        private readonly validateBankAccountOwnershioService: ValidateBankAccountOwnershipService,
        private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
        private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
    ) {}

    async create(userId: string, createTransactionDto: CreateTransactionDto) {
        const { bankAccountId, categoryId, name, value, date, type } =
            createTransactionDto;

        await this.validateEntitiesOwnership({
            userId,
            bankAccountId,
            categoryId,
        });

        return this.transactionRepo.create({
            data: {
                userId,
                bankAccountId,
                categoryId,
                name,
                value,
                date,
                type,
            },
        });
    }

    findAll() {
        return `This action returns all transaction`;
    }

    findOne(id: number) {
        return `This action returns a #${id} transaction`;
    }

    async update(
        userId: string,
        transactionId: string,
        updateTransactionDto: UpdateTransactionDto,
    ) {
        const { bankAccountId, categoryId, name, value, date, type } =
            updateTransactionDto;

        await this.validateEntitiesOwnership({
            userId,
            bankAccountId,
            categoryId,
            transactionId,
        });

        return this.transactionRepo.update({
            data: { bankAccountId, categoryId, name, value, date, type },
            where: { id: transactionId },
        });
    }

    remove(id: number) {
        return `This action removes a #${id} transaction`;
    }

    private async validateEntitiesOwnership({
        userId,
        bankAccountId,
        categoryId,
        transactionId,
    }: {
        userId: string;
        bankAccountId: string;
        categoryId: string;
        transactionId?: string;
    }) {
        await Promise.all([
            transactionId &&
                this.validateTransactionOwnershipService.validate(
                    userId,
                    transactionId,
                ),
            this.validateBankAccountOwnershioService.validate(
                userId,
                bankAccountId,
            ),
            this.validateCategoryOwnershipService.validate(userId, categoryId),
        ]);
    }
}
