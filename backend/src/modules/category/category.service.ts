import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/shared/database/repositories/category.repositories';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepo: CategoryRepository) {}

    findAll() {
        return this.categoryRepo.findMany({
            where: { userId: null },
        });
    }
}
