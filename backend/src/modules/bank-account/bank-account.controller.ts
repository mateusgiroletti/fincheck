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
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IndexBankAccount } from './dto/index-bank-account.dto';

@Controller('bank-account')
@ApiTags('Bank Accounts')
@ApiBearerAuth()
export class BankAccountController {
    constructor(private readonly bankAccountService: BankAccountService) {}

    @Get()
    @ApiOperation({ summary: 'Bank Account informations' })
    @ApiResponse({
        status: 200,
        description: 'Returns the bank accounts of the logged in user',
        type: IndexBankAccount,
        isArray: true,
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
        type: ApiUnauthorizedResponse,
    })
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
