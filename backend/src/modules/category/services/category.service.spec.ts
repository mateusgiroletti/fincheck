import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryRepository } from '../../../shared/database/repositories/category.repositorie';
import { PrismaService } from '../../../shared/database/prisma.service';
import { TransactionType } from '../../../modules/transaction/entities/Transaction';

describe('CategoryService', () => {
    let categoryService: CategoryService;
    let categoryRepository: CategoryRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CategoryService, CategoryRepository, PrismaService],
        }).compile();

        categoryService = module.get<CategoryService>(CategoryService);
        categoryRepository = module.get<CategoryRepository>(CategoryRepository);
    });

    it('should be defined', () => {
        expect(categoryService).toBeDefined();
        expect(categoryRepository).toBeDefined();
    });

    describe('findAll', () => {
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
    });
});
