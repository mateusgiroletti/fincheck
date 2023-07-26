import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryRepository {
    constructor(private readonly prismaService: PrismaService) {}

    findMany(findManyDto: Prisma.CategoryFindManyArgs) {
        return this.prismaService.category.findMany(findManyDto);
    }
}
