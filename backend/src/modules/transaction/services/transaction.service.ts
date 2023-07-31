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

    findAllByUserId(userId: string, filters: { month: number; year: number }) {
        return this.transactionRepo.findMany({
            where: {
                userId,
                date: {
                    gte: new Date(Date.UTC(filters.year, filters.month)),
                    lt: new Date(Date.UTC(filters.year, filters.month + 1)),
                },
            },
        });
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

    async remove(userId: string, transactionId: string) {
        await this.validateEntitiesOwnership({ userId, transactionId });

        await this.transactionRepo.delete({
            where: { id: transactionId },
        });

        return null;
    }

    private async validateEntitiesOwnership({
        userId,
        bankAccountId,
        categoryId,
        transactionId,
    }: {
        userId: string;
        bankAccountId?: string;
        categoryId?: string;
        transactionId?: string;
    }) {
        await Promise.all([
            transactionId &&
                this.validateTransactionOwnershipService.validate(
                    userId,
                    transactionId,
                ),
            bankAccountId &&
                this.validateBankAccountOwnershioService.validate(
                    userId,
                    bankAccountId,
                ),
            categoryId &&
                this.validateCategoryOwnershipService.validate(
                    userId,
                    categoryId,
                ),
        ]);
    }
}