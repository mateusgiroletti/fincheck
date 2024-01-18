import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';

export class IndexTransactionDto extends CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    id: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    userId: string;
}
