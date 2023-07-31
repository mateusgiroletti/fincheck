import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from 'src/shared/database/repositories/transaction.repositorie';
import { ValidateBankAccountOwnershipService } from '../bank-account/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../category/services/validate-category-ownership.service';

@Injectable()
export class TransactionService {
    constructor(
        private readonly transactionRepo: TransactionRepository,
        private readonly validateBankAccountOwnershioService: ValidateBankAccountOwnershipService,
        private readonly validateCategoryOwnershioService: ValidateCategoryOwnershipService,
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

    update(id: number, updateTransactionDto: UpdateTransactionDto) {
        return `This action updates a #${id} transaction`;
    }

    remove(id: number) {
        return `This action removes a #${id} transaction`;
    }

    private async validateEntitiesOwnership({
        userId,
        bankAccountId,
        categoryId,
    }: {
        userId: string;
        bankAccountId: string;
        categoryId: string;
    }) {
        await Promise.all([
            this.validateBankAccountOwnershioService.validate(
                userId,
                bankAccountId,
            ),
            this.validateCategoryOwnershioService.validate(userId, categoryId),
        ]);
    }
}
