import {
    IsEnum,
    IsHexColor,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUUID,
} from 'class-validator';
import { BankAccountType } from '../entities/BankAccount';
import { ApiProperty } from '@nestjs/swagger';

export class IndexBankAccount {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    id: string;

    @IsString()
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    initialBalance: number;

    @IsNotEmpty()
    @IsEnum(BankAccountType)
    @ApiProperty()
    type: BankAccountType;

    @IsString()
    @IsNotEmpty()
    @IsHexColor()
    @ApiProperty()
    color: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    currentBalance: number;
}
