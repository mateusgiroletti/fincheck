import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../../shared/database/repositories/category.repositorie';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepo: CategoryRepository) {}

    findAll() {
        return this.categoryRepo.findMany({
            where: { userId: null },
        });
    }
}
