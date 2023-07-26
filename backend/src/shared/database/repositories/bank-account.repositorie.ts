import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(createDto: Prisma.BanckAccountCreateArgs) {
        return this.prismaService.banckAccount.create(createDto);
    }
}
