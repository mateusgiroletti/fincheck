import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { CategoryModule } from './modules/category/category.module';
import { BankAccountModule } from './modules/bank-account/bank-account.module';

@Module({
    imports: [UserModule, DatabaseModule, AuthModule, CategoryModule, BankAccountModule],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
