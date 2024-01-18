import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class IndexCategoryDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsUUID()
    @ApiPropertyOptional()
    userId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    icon: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(TransactionType)
    @ApiProperty()
    type: TransactionType;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    isCustom: boolean;
}
