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
import { LoggedUserId } from '../../shared/decorators/LoggedUserId';
import { ApiTags } from '@nestjs/swagger';

@Controller('bank-account')
@ApiTags('Bank Accounts')
export class BankAccountController {
    constructor(private readonly bankAccountService: BankAccountService) {}

    @Get()
    findAllByUserId(@LoggedUserId() userId: string) {
        return this.bankAccountService.findAllByUserId(userId);
    }

    @Post()
    create(
        @LoggedUserId() userId: string,
        @Body() createBankAccountDto: CreateBankAccountDto,
    ) {
        return this.bankAccountService.create(userId, createBankAccountDto);
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
