import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountController } from './bank-account.controller';
import { BankAccountService } from './services/bank-account.service';
import { BankAccountRepository } from '../../shared/database/repositories/bank-account.repositorie';
import { PrismaService } from '../../shared/database/prisma.service';
import { BankAccountType } from './entities/BankAccount';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';

describe('BankAccountController', () => {
    let bankAccountController: BankAccountController;
    let bankAccountService: BankAccountService;

    const userId = 'testUserId';

    const bankAccountDto: CreateBankAccountDto = {
        color: '#FFF',
        initialBalance: 50,
        name: 'bank',
        type: BankAccountType.CHECKING,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BankAccountController],
            providers: [
                {
                    provide: BankAccountService,
                    useValue: {
                        create: jest.fn().mockResolvedValue(bankAccountDto),
                    },
                },
                BankAccountRepository,
                PrismaService,
            ],
        }).compile();

        bankAccountController = module.get<BankAccountController>(
            BankAccountController,
        );
        bankAccountService = module.get<BankAccountService>(BankAccountService);
    });

    it('should be defined', () => {
        expect(bankAccountController).toBeDefined();
        expect(bankAccountService).toBeDefined();
    });

    describe('create', () => {
        it('should create a bank account and return your data', async () => {
            // Call the controller method
            const result = await bankAccountController.create(
                userId,
                bankAccountDto,
            );

            // Assert the result
            expect(result).toEqual(bankAccountDto);
            expect(bankAccountService.create).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', () => {
            jest.spyOn(bankAccountService, 'create').mockRejectedValueOnce(
                new Error(),
            );

            expect(
                bankAccountController.create(userId, bankAccountDto),
            ).rejects.toThrowError();
        });
    });
});
