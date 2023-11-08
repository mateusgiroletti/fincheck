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
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { LoggedUserId } from 'src/shared/decorators/LoggedUserId';
import { TransactionType } from './entities/Transaction';
import { OptionalParseEnumParse } from 'src/shared/pipes/OptionalParseEnumParse';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    create(
        @LoggedUserId() userId: string,
        @Body() createTransactionDto: CreateTransactionDto,
    ) {
        return this.transactionService.create(userId, createTransactionDto);
    }

    @Get()
    findAll(
        @LoggedUserId() userId: string,
        @Query('month', ParseIntPipe) month: number,
        @Query('year', ParseIntPipe) year: number,
        @Query('bankAccountId') bankAccountId?: string,
        @Query('transactionType', new OptionalParseEnumParse(TransactionType))
        transactionType?: TransactionType,
    ) {
        return this.transactionService.findAllByUserId(userId, {
            month,
            year,
            bankAccountId,
            transactionType,
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionService.findOne(+id);
    }

    @Put(':transactionId')
    update(
        @LoggedUserId() userId: string,
        @Param('transactionId', ParseUUIDPipe) transactionId: string,
        @Body() updateTransactionDto: UpdateTransactionDto,
    ) {
        return this.transactionService.update(
            userId,
            transactionId,
            updateTransactionDto,
        );
    }

    @Delete(':transactionId')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @LoggedUserId() userId: string,
        @Param('transactionId', ParseUUIDPipe) transactionId: string,
    ) {
        return this.transactionService.remove(userId, transactionId);
    }
}
