import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from '../../shared/database/repositories/category.repositorie';
import { PrismaService } from '../../shared/database/prisma.service';
import { IndexCategoryDto } from './dto/index-category.dto';

describe('CategoryController', () => {
    let categoryController: CategoryController;
    let categoryService: CategoryService;

    const categories: IndexCategoryDto[] = [
        {
            id: 'f27ac21e-4d7f-44b5-b2f9-02c9ee8a73ae',
            userId: null,
            name: 'Salário',
            icon: 'salary',
            type: 'INCOME',
            isCustom: false,
        },
        {
            id: 'fd9265c6-8a91-48ee-9f5a-4998fcff925b',
            userId: null,
            name: 'Freelance',
            icon: 'freelance',
            type: 'INCOME',
            isCustom: false,
        },
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoryController],
            providers: [
                {
                    provide: CategoryService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue(categories),
                    },
                },
                CategoryRepository,
                PrismaService,
            ],
        }).compile();

        categoryController = module.get<CategoryController>(CategoryController);
        categoryService = module.get<CategoryService>(CategoryService);
    });

    it('should be defined', () => {
        expect(categoryController).toBeDefined();
        expect(categoryService).toBeDefined();
    });

    describe('findAll', () => {
        it('should return all categories', async () => {
            // Call the controller method
            const result = await categoryController.findAll();

            // Assert the result
            expect(result).toEqual(categories);
            expect(categoryService.findAll).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', () => {
            jest.spyOn(categoryService, 'findAll').mockRejectedValueOnce(
                new Error(),
            );

            expect(categoryController.findAll()).rejects.toThrowError();
        });
    });
});
