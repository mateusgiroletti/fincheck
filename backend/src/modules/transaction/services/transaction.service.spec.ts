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
            const bankAccountId = ['3'];

            const filters = {
                month: 1,
                year: 2023,
                transactionType: TransactionType.INCOME,
                bankAccountId,
            };

            const mockTransaciton = [
                {
                    id: '1',
                    userId: '2',
                    bankAccountId: '3',
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
                        in: filters.bankAccountId['bankAccountId'],
                    },
                },
            });
        });
    });

    describe('create', () => {
        it('should create a transaction and return it', async () => {
            const userId = '1';
            const bankAccountId = '3';

            const requestTransaction = {
                userId,
                bankAccountId,
                categoryId: '1',
                name: 'bank',
                value: 150.0,
                date: '1701029179542',
                type: TransactionType.INCOME,
            };

            const mockTransaciton = {
                id: '1',
                userId: '2',
                bankAccountId,
                categoryId: '1',
                name: 'bank',
                value: 150.0,
                date: new Date(Date.now()),
                type: TransactionType.INCOME,
            };

            jest.spyOn(transactionRepo, 'create').mockResolvedValue(
                mockTransaciton,
            );

            jest.spyOn(
                validateTransactionOwnershipService,
                'validate',
            ).mockResolvedValue();

            jest.spyOn(
                validateBankAccountOwnershioService,
                'validate',
            ).mockResolvedValue();

            jest.spyOn(
                validateCategoryOwnershipService,
                'validate',
            ).mockResolvedValue();

            const transaction = await transactionService.create(
                userId,
                requestTransaction,
            );

            // Assert that the service returns the expected user
            expect(transaction).toEqual(mockTransaciton);

            // Assert that the create method of transactionRepo was called with the correct parameters
            expect(transactionRepo.create).toHaveBeenCalledWith({
                data: {
                    userId,
                    bankAccountId,
                    categoryId: '1',
                    name: 'bank',
                    value: 150.0,
                    date: '1701029179542',
                    type: TransactionType.INCOME,
                },
            });
        });
    });

    describe('update', () => {
        it('should update a transaction and return it', async () => {
            const userId = '1';
            const bankAccountId = '3';
            const transactionId = '4';

            const requestTransaction = {
                bankAccountId,
                categoryId: '1',
                name: 'bank',
                value: 150.0,
                date: '1701029179542',
                type: TransactionType.INCOME,
            };

            const mockTransaciton = {
                id: '1',
                userId: '2',
                bankAccountId,
                categoryId: '1',
                name: 'bank',
                value: 150.0,
                date: new Date(Date.now()),
                type: TransactionType.INCOME,
            };

            jest.spyOn(transactionRepo, 'update').mockResolvedValue(
                mockTransaciton,
            );

            jest.spyOn(
                validateTransactionOwnershipService,
                'validate',
            ).mockResolvedValue();

            jest.spyOn(
                validateBankAccountOwnershioService,
                'validate',
            ).mockResolvedValue();

            jest.spyOn(
                validateCategoryOwnershipService,
                'validate',
            ).mockResolvedValue();

            const transaction = await transactionService.update(
                userId,
                transactionId,
                requestTransaction,
            );

            // Assert that the service returns the expected user
            expect(transaction).toEqual(mockTransaciton);

            // Assert that the update method of transactionRepo was called with the correct parameters
            expect(transactionRepo.update).toHaveBeenCalledWith({
                data: {
                    bankAccountId,
                    categoryId: '1',
                    name: 'bank',
                    value: 150.0,
                    date: '1701029179542',
                    type: TransactionType.INCOME,
                },
                where: { id: transactionId },
            });
        });
    });

    describe('dalete', () => {
        it('should delete a transaction by userId and transactionid', async () => {
            const userId = '1';
            const transactionId = '4';

            jest.spyOn(transactionRepo, 'delete').mockResolvedValue(null);

            jest.spyOn(
                validateTransactionOwnershipService,
                'validate',
            ).mockResolvedValue();

            const transaction = await transactionService.remove(
                userId,
                transactionId,
            );

            // Assert that the service returns the expected user
            expect(transaction).toBeNull();

            // Assert that the update method of transactionRepo was called with the correct parameters
            expect(transactionRepo.delete).toHaveBeenCalledWith({
                where: { id: transactionId },
            });
        });
    });
});
