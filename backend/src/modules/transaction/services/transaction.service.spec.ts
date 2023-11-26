import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { PrismaService } from '../../../shared/database/prisma.service';
import { TransactionType } from '../entities/Transaction';
import { TransactionRepository } from '../../../shared/database/repositories/transaction.repositorie';
import { ValidateBankAccountOwnershipService } from '../../bank-account/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../category/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import { BankAccountRepository } from '../../../shared/database/repositories/bank-account.repositorie';
import { CategoryRepository } from '../../../shared/database/repositories/category.repositorie';

describe('TransactionService', () => {
    let transactionService: TransactionService;
    let transactionRepo: TransactionRepository;
    let validateBankAccountOwnershioService: ValidateBankAccountOwnershipService;
    let validateCategoryOwnershipService: ValidateCategoryOwnershipService;
    let validateTransactionOwnershipService: ValidateTransactionOwnershipService;
    let bankAccountRepository: BankAccountRepository;
    let categoryRepository: CategoryRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransactionService,
                TransactionRepository,
                ValidateBankAccountOwnershipService,
                ValidateCategoryOwnershipService,
                ValidateTransactionOwnershipService,
                BankAccountRepository,
                CategoryRepository,
                PrismaService,
            ],
        }).compile();

        transactionService = module.get<TransactionService>(TransactionService);
        transactionRepo = module.get<TransactionRepository>(
            TransactionRepository,
        );
        validateBankAccountOwnershioService =
            module.get<ValidateBankAccountOwnershipService>(
                ValidateBankAccountOwnershipService,
            );
        validateCategoryOwnershipService =
            module.get<ValidateCategoryOwnershipService>(
                ValidateCategoryOwnershipService,
            );
        validateTransactionOwnershipService =
            module.get<ValidateTransactionOwnershipService>(
                ValidateTransactionOwnershipService,
            );
        bankAccountRepository = module.get<BankAccountRepository>(
            BankAccountRepository,
        );
        categoryRepository = module.get<CategoryRepository>(CategoryRepository);
    });

    it('should be defined', () => {
        expect([
            transactionService,
            transactionRepo,
            validateBankAccountOwnershioService,
            validateCategoryOwnershipService,
            validateTransactionOwnershipService,
            bankAccountRepository,
            categoryRepository,
        ]).toBeDefined();
    });

    describe('findAllByUserId', () => {
        it('should return all transactions for a given user', async () => {
            const userId = '1';
            const bankAccountId = '3';
            const filters = {
                month: 1,
                year: 2023,
                bankAccountId: bankAccountId,
                transactionType: TransactionType.INCOME,
            };

            const mockTransaciton = [
                {
                    id: '1',
                    userId: '2',
                    bankAccountId: bankAccountId,
                    categoryId: '4',
                    name: 'bank',
                    value: 555.0,
                    date: new Date(Date.now()),
                    type: TransactionType.INCOME,
                },
            ];

            jest.spyOn(transactionRepo, 'findMany').mockResolvedValue(
                mockTransaciton,
            );

            const transaction = await transactionService.findAllByUserId(
                userId,
                filters,
            );

            // Assert that the service returns the expected user
            expect(transaction).toEqual(mockTransaciton);

            // Assert that the findMany method of transactionRepo was called with the correct parameters
            expect(transactionRepo.findMany).toHaveBeenCalledWith({
                where: {
                    userId,
                    type: filters.transactionType,
                    date: {
                        gte: new Date(Date.UTC(filters.year, filters.month)),
                        lt: new Date(Date.UTC(filters.year, filters.month + 1)),
                    },
                    bankAccountId: {
                        in: ['3'],
                    },
                },
            });
        });
    });
});
