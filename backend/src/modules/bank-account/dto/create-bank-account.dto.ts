import {
    IsEnum,
    IsHexColor,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';
import { BankAccountType } from '../entities/BankAccount';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBankAccountDto {
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
}
