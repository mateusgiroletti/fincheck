import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('Categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }
}
