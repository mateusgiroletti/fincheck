import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { LoggedUserId } from '../../shared/decorators/LoggedUserId';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IndexUserDto } from './dto/index-user.dto';

@Controller('user')
@ApiTags('Me')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/me')
    @ApiOperation({ summary: 'Information a user logged' })
    @ApiResponse({
        status: 200,
        type: IndexUserDto,
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
        type: ApiUnauthorizedResponse,
    })
    me(@LoggedUserId() userId: string) {
        return this.userService.getUserById(userId);
    }
}
