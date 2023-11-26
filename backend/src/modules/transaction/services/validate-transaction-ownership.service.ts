import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '../../../shared/database/repositories/transaction.repositorie';

@Injectable()
export class ValidateTransactionOwnershipService {
    constructor(private readonly transactionRepo: TransactionRepository) {}

    async validate(userId: string, transactionId: string) {
        const isOwner = await this.transactionRepo.findFirst({
            where: { userId, id: transactionId },
        });

        if (!isOwner) {
            throw new NotFoundException('Transaction not found');
        }
    }
}
