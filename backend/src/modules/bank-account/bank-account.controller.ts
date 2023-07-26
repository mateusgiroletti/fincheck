import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
} from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
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
    findAll() {
        return this.bankAccountService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bankAccountService.findOne(+id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateBankAccountDto: UpdateBankAccountDto,
    ) {
        return this.bankAccountService.update(+id, updateBankAccountDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bankAccountService.remove(+id);
    }
}
