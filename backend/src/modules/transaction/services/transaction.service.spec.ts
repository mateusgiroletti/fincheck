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

    /*    describe('findAll', () => {
        it('should return all categories where userId is null', async () => {
            const mockCategory = [
                {
                    id: '1',
                    userId: null,
                    name: 'cat',
                    icon: 'icon',
                    type: TransactionType.INCOME,
                    isCustom: false,
                },
            ];

            jest.spyOn(categoryRepository, 'findMany').mockResolvedValue(
                mockCategory,
            );

            const category = await categoryService.findAll();

            // Assert that the service returns the expected user
            expect(category).toEqual(mockCategory);

            // Assert that the findMany method of CategoryRepository was called with the correct parameters
            expect(categoryRepository.findMany).toHaveBeenCalledWith({
                where: { userId: null },
            });
        });
    }); */
});
