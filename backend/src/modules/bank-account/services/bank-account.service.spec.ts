import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountService } from './bank-account.service';
import { BankAccountRepository } from '../../../shared/database/repositories/bank-account.repositorie';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';
import { PrismaService } from '../../../shared/database/prisma.service';

describe('BankAccountService', () => {
    let bankAccountService: BankAccountService;
    let bankAccountRepository: BankAccountRepository;
    let validateBankAccountOwnershipService: ValidateBankAccountOwnershipService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BankAccountService, BankAccountRepository, ValidateBankAccountOwnershipService, PrismaService],
        }).compile();

        bankAccountService = module.get<BankAccountService>(BankAccountService);
        bankAccountRepository = module.get<BankAccountRepository>(BankAccountRepository);
        validateBankAccountOwnershipService = module.get<ValidateBankAccountOwnershipService>(ValidateBankAccountOwnershipService);
    });

    it('should be defined', () => {
        expect(bankAccountService).toBeDefined();
        expect(bankAccountRepository).toBeDefined();
        expect(validateBankAccountOwnershipService).toBeDefined();
    });

});
