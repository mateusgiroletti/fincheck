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
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('transaction')
@ApiTags('Transactions')
@ApiBearerAuth()
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Get()
    @ApiOperation({summary: 'List logged in user transactions'})
    @ApiQuery({ name: 'month' })
    @ApiQuery({ name: 'year' })
    @ApiQuery({ name: 'bankAccountId', required: false })
    @ApiQuery({ name: 'transactionType', enum: TransactionType, required: false })
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

    @Post()
    @ApiOperation({summary: 'Create a transaction for the logged in user'})
    create(
        @LoggedUserId() userId: string,
        @Body() createTransactionDto: CreateTransactionDto,
    ) {
        return this.transactionService.create(userId, createTransactionDto);
    }

    @Put(':transactionId')
    @ApiOperation({summary: 'Update a transaction for the logged in user'})
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
    @ApiOperation({summary: 'Delete a transaction for the logged in user'})
    remove(
        @LoggedUserId() userId: string,
        @Param('transactionId', ParseUUIDPipe) transactionId: string,
    ) {
        return this.transactionService.remove(userId, transactionId);
    }
}
