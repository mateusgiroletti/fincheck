import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexCategoryDto } from './dto/index-category.dto';

@Controller('category')
@ApiTags('Categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @ApiOperation({ summary: 'Categories informations' })
    @ApiResponse({
        status: 200,
        description: 'Returns the list of categories',
        type: IndexCategoryDto,
        isArray: true,
    })
    findAll() {
        return this.categoryService.findAll();
    }
}
