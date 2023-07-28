import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from 'src/shared/database/repositories/category.repositorie';

@Injectable()
export class ValidateCategoryOwnershipService {
    constructor(private readonly categoryRepo: CategoryRepository) {}

    async validate(userId: string, categoryId: string) {
        const isOwner = await this.categoryRepo.findFirst({
            where: { id: categoryId },
        });

        if (!isOwner) {
            throw new NotFoundException('Category not found');
        }
    }
}
