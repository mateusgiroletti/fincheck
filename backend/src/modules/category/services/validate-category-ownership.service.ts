import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from 'src/shared/database/repositories/category.repositorie';

@Injectable()
export class ValidateCategoryOwnershipService {
    constructor(private readonly categoryRepo: CategoryRepository) {}

    async validate(userId: string, categoryId: string) {
        const category = await this.categoryRepo.findFirst({
            where: { id: categoryId },
        });

        let isOwner: boolean;

        if (category.userId) {
            if (userId === category.userId) {
                isOwner = true;
            } else {
                isOwner = false;
            }
        } else {
            isOwner = true;
        }

        if (!isOwner) {
            throw new NotFoundException('Category not found');
        }
    }
}
