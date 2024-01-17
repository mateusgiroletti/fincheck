import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountService } from './bank-account.service';
import { BankAccountRepository } from '../../../shared/database/repositories/bank-account.repositorie';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';
import { PrismaService } from '../../../shared/database/prisma.service';
import { BankAccountType } from '../entities/BankAccount';
import { TransactionType } from '../../../modules/transaction/entities/Transaction';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { NotFoundException } from '@nestjs/common';

describe('BankAccountService', () => {
    let bankAccountService: BankAccountService;
    let bankAccountRepository: BankAccountRepository;
    let validateBankAccountOwnershipService: ValidateBankAccountOwnershipService;
    let validateBankAccountOwnershioService: ValidateBankAccountOwnershipService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BankAccountService, BankAccountRepository, ValidateBankAccountOwnershipService, PrismaService],
        }).compile();

        bankAccountService = module.get<BankAccountService>(BankAccountService);
        bankAccountRepository = module.get<BankAccountRepository>(BankAccountRepository);
        validateBankAccountOwnershipService = module.get<ValidateBankAccountOwnershipService>(ValidateBankAccountOwnershipService);
        validateBankAccountOwnershioService =
            module.get<ValidateBankAccountOwnershipService>(
                ValidateBankAccountOwnershipService,
            );
    });

    it('should be defined', () => {
        expect(bankAccountService).toBeDefined();
        expect(bankAccountRepository).toBeDefined();
        expect(validateBankAccountOwnershipService).toBeDefined();
    });

    describe('create', () => {
        it('should be create a new bank account', async () => {
            const userId = '2';

            const requestBankAccount = {
                id: '1',
                userId,
                name: 'bank',
                initialBalance: 1500,
                type: BankAccountType.CASH,
                color: '#fff'
            };

            jest.spyOn(bankAccountRepository, 'create').mockResolvedValue(
                requestBankAccount,
            );

            const bankAccount = await bankAccountService.create(
                userId,
                requestBankAccount,
            );

            expect(bankAccount).toEqual(requestBankAccount);
            expect(bankAccountRepository.create).toHaveBeenCalledWith({
                data: {
                    userId: '2',
                    name: 'bank',
                    initialBalance: 1500,
                    type: BankAccountType.CASH,
                    color: '#fff'
                },
            });
        })
    });

    describe('findAllByUserId', () => {
        it('should be return all user bank account', async () => {
            const userId = '2';

            const bankAccountMock = [
                {
                    id: '1',
                    userId: '2',
                    name: 'bank',
                    initialBalance: 1500,
                    type: BankAccountType.CASH,
                    color: '#fff',
                    transaction: [
                        {
                            type: TransactionType.EXPENSE,
                            value: 5000,
                        }
                    ]
                }
            ];

            jest.spyOn(bankAccountRepository, 'findMany').mockResolvedValue(
                bankAccountMock,
            );

            await bankAccountService.findAllByUserId(userId);

            expect(bankAccountRepository.findMany).toHaveBeenCalledWith({
                where: { userId },
                include: {
                    transaction: {
                        select: {
                            type: true,
                            value: true,
                        },
                    },
                },
            });
        });
    });

    describe('update', () => {
        it('should be update a bank account', async () => {
            const userId = '1';
            const bankAccountId = '2';

            const updateBankAccountDto: UpdateBankAccountDto = {
                color: '#ddd',
                initialBalance: 1500,
                name: 'bank',
                type: BankAccountType.CASH,
            };

            jest.spyOn(bankAccountRepository, 'update').mockResolvedValue(
                {
                    id: '2',
                    userId: '1',
                    name: 'bank',
                    initialBalance: 1500,
                    type: BankAccountType.CASH,
                    color: '#ddd'
                },
            );

            jest.spyOn(
                validateBankAccountOwnershioService,
                'validate',
            ).mockResolvedValue();

            await bankAccountService.update(
                userId,
                bankAccountId,
                updateBankAccountDto,
            );

            expect(validateBankAccountOwnershipService.validate).toHaveBeenCalledWith(
                userId,
                bankAccountId,
            );

            expect(bankAccountRepository.update).toHaveBeenCalledWith({
                where: { id: bankAccountId },
                data: updateBankAccountDto,
            });
        });

        it('should be throw NotFoundException if bank account Ownership is not correct', async () => {
            const userId = '1';
            const bankAccountId = '2';

            const updateBankAccountDto: UpdateBankAccountDto = {
                color: '#ddd',
                initialBalance: 1500,
                name: 'bank',
                type: BankAccountType.CASH,
            };

            jest.spyOn(bankAccountRepository, 'update').mockResolvedValue(
                {
                    id: '2',
                    userId: '2',
                    name: 'bank',
                    initialBalance: 1500,
                    type: BankAccountType.CASH,
                    color: '#ddd'
                },
            );

            jest.spyOn(validateBankAccountOwnershipService, 'validate').mockImplementation(() => {
                throw new NotFoundException('Bank account not found');
            });

            await expect(
                bankAccountService.update(userId, bankAccountId, updateBankAccountDto),
            ).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a bank account', async () => {
            const userId = '1';
            const bankAccountId = '2';

            jest.spyOn(bankAccountRepository, 'delete').mockResolvedValue(
                {
                    id: '2',
                    userId: '1',
                    name: 'bank',
                    initialBalance: 1500,
                    type: BankAccountType.CASH,
                    color: '#fff'
                }
            );

            jest.spyOn(
                validateBankAccountOwnershioService,
                'validate',
            ).mockResolvedValue();

            await bankAccountService.remove(userId, bankAccountId);

            expect(validateBankAccountOwnershipService.validate).toHaveBeenCalledWith(
                userId,
                bankAccountId,
            );

            expect(bankAccountRepository.delete).toHaveBeenCalledWith({
                where: { id: bankAccountId },
            });
        });
    });
});