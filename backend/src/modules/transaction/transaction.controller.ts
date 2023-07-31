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
import { TransactionService } from './services/transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { LoggedUserId } from 'src/shared/decorators/LoggedUserId';

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
    findAll() {
        return this.transactionService.findAll();
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
