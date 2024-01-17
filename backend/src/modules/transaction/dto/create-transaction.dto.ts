import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    IsUUID,
} from 'class-validator';
import { TransactionType } from '../entities/Transaction';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    bankAccountId: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    categoryId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    value: number;

    @IsNotEmpty()
    @IsDateString()
    @ApiProperty()
    date: string;

    @IsNotEmpty()
    @IsEnum(TransactionType)
    @ApiProperty()
    type: TransactionType;
}
