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
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IndexTransactionDto } from './dto/index-transaction.dto';

@Controller('transaction')
@ApiTags('Transactions')
@ApiBearerAuth()
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get()
    @ApiOperation({ summary: 'List logged in user transactions' })
    @ApiQuery({ name: 'month' })
    @ApiQuery({ name: 'year' })
    @ApiQuery({ name: 'bankAccountId', required: false })
    @ApiQuery({
        name: 'transactionType',
        enum: TransactionType,
        required: false,
    })
    @ApiResponse({
        status: 200,
        description: 'Returns the transaction list of user logged',
        type: IndexTransactionDto,
        isArray: true,
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
        type: ApiUnauthorizedResponse,
    })
    findAll(
        @LoggedUserId() userId: string,
        @Query('month', ParseIntPipe) month: number,
        @Query('year', ParseIntPipe) year: number,
        @Query('transactionType', new OptionalParseEnumParse(TransactionType))
        transactionType?: TransactionType,
        @Body() bankAccountId?: string[],
    ) {
        return this.transactionService.findAllByUserId(userId, {
            month,
            year,
            transactionType,
            bankAccountId,
        });
    }

    @Post()
    @ApiOperation({ summary: 'Create a transaction for the logged in user' })
    @ApiResponse({
        status: 201,
        description: 'Returns the transaction created',
        type: CreateTransactionDto,
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
        type: ApiUnauthorizedResponse,
    })
    create(
        @LoggedUserId() userId: string,
        @Body() createTransactionDto: CreateTransactionDto,
    ) {
        return this.transactionService.create(userId, createTransactionDto);
    }

    @Put(':transactionId')
    @ApiOperation({ summary: 'Update a transaction for the logged in user' })
    @ApiResponse({
        status: 201,
        description: 'Returns the transaction updated',
        type: UpdateTransactionDto,
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
        type: ApiUnauthorizedResponse,
    })
    @ApiResponse({
        status: 404,
        description: 'Transaction not found',
        type: ApiNotFoundResponse,
    })
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
    @ApiOperation({ summary: 'Delete a transaction for the logged in user' })
    @ApiResponse({
        status: 204,
        description: 'No Content',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
        type: ApiUnauthorizedResponse,
    })
    @ApiResponse({
        status: 404,
        description: 'Transaction not found',
        type: ApiNotFoundResponse,
    })
    remove(
        @LoggedUserId() userId: string,
        @Param('transactionId', ParseUUIDPipe) transactionId: string,
    ) {
        return this.transactionService.remove(userId, transactionId);
    }
}
