import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountRepository } from 'src/shared/database/repositories/bank-account.repositorie';

@Injectable()
export class BankAccountService {
    constructor(private readonly bankAccountRepo: BankAccountRepository) {}

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

    findAll() {
        return `This action returns all bankAccount`;
    }

    findOne(id: number) {
        return `This action returns a #${id} bankAccount`;
    }

    update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
        return `This action updates a #${id} bankAccount`;
    }

    remove(id: number) {
        return `This action removes a #${id} bankAccount`;
    }
}
