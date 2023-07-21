import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repositories';

@Global()
@Module({
    providers: [PrismaService, UserRepository],
    exports: [UserRepository],
})
export class DatabaseModule {}
