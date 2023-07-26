import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { BankAccountService } from './services/bank-account.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { LoggedUserId } from 'src/shared/decorators/LoggedUserId';

@Controller('bank-account')
export class BankAccountController {
    constructor(private readonly bankAccountService: BankAccountService) {}

    @Post()
    create(
        @LoggedUserId() userId: string,
        @Body() createBankAccountDto: CreateBankAccountDto,
    ) {
        return this.bankAccountService.create(userId, createBankAccountDto);
    }

    @Get()
    findAllByUserId(@LoggedUserId() userId: string) {
        return this.bankAccountService.findAllByUserId(userId);
    }

    @Put(':bankAccountId')
    update(
        @LoggedUserId() userId: string,
        @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
        @Body() updateBankAccountDto: UpdateBankAccountDto,
    ) {
        return this.bankAccountService.update(
            userId,
            String(bankAccountId),
            updateBankAccountDto,
        );
    }

    @Delete(':bankAccountId')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @LoggedUserId() userId: string,
        @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    ) {
        return this.bankAccountService.remove(userId, bankAccountId);
    }
}
