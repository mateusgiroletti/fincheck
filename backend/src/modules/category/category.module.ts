import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoryController } from './category.controller';

@Module({
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
