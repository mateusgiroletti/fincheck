import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from 'src/shared/database/repositories/transaction.repositorie';

@Injectable()
export class TransactionService {
    constructor(private readonly transactionRepo: TransactionRepository) {}

    create(userId: string, createTransactionDto: CreateTransactionDto) {
        return 'This action adds a new transaction';
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
}
