import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoryController } from './category.controller';
import { ValidateCategoryOwnershipService } from './services/validate-category-ownership.service';

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, ValidateCategoryOwnershipService],
    exports: [ValidateCategoryOwnershipService],
})
export class CategoryModule {}
