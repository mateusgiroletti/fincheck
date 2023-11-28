import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../shared/database/prisma.service';
import { TransactionRepository } from '../../../shared/database/repositories/transaction.repositorie';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import { TransactionType } from '../entities/Transaction';

describe('ValidateTransactionOwnershipService', () => {
    let validateTransactionOwnershipService: ValidateTransactionOwnershipService;
    let transactionRepo: TransactionRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ValidateTransactionOwnershipService,
                TransactionRepository,
                PrismaService,
            ],
        }).compile();

        validateTransactionOwnershipService =
            module.get<ValidateTransactionOwnershipService>(
                ValidateTransactionOwnershipService,
            );

        transactionRepo = module.get<TransactionRepository>(
            TransactionRepository,
        );
    });

    it('should be defined', () => {
        expect([
            validateTransactionOwnershipService,
            transactionRepo,
        ]).toBeDefined();
    });

    describe('validate', () => {
        it('should not throw an error when the user is the owner of the transaction', async () => {
            const userId = '1';
            const transactionId = '2';

            const mockTransaciton = {
                id: '1',
                userId: '2',
                bankAccountId: '3',
                categoryId: '4',
                name: 'bank',
                value: 555.0,
                date: new Date(Date.now()),
                type: TransactionType.INCOME,
            };

            // Simule que o findFirst retorna um resultado indicando que o usuário é o proprietário
            jest.spyOn(transactionRepo, 'findFirst').mockResolvedValue(
                mockTransaciton,
            );

            // Execute o método validate e verifique se não lança uma exceção
            await expect(
                validateTransactionOwnershipService.validate(
                    userId,
                    transactionId,
                ),
            ).resolves.not.toThrow();

            // Verifique se o findFirst foi chamado corretamente
            expect(transactionRepo.findFirst).toHaveBeenCalledWith({
                where: { userId, id: transactionId },
            });
        });

        it('should throw a NotFoundException when the user is not the owner of the transaction', async () => {
            const userId = '1';
            const transactionId = '2';

            // Simule que o findFirst não retorna nenhum resultado, indicando que o usuário não é o proprietário
            jest.spyOn(transactionRepo, 'findFirst').mockResolvedValueOnce(
                null,
            );

            // Execute o método validate e verifique se lança uma NotFoundException
            await expect(
                validateTransactionOwnershipService.validate(
                    userId,
                    transactionId,
                ),
            ).rejects.toThrowError('Transaction not found');

            // Verifique se o findFirst foi chamado corretamente
            expect(transactionRepo.findFirst).toHaveBeenCalledWith({
                where: { userId, id: transactionId },
            });
        });
    });
});
