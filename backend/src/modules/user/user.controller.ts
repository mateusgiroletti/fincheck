import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { LoggedUserId } from '../../shared/decorators/LoggedUserId';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Me')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/me')
    @ApiOperation({ summary: 'List of information a user logged' })
    @ApiResponse({
      status: 200
    })
    me(@LoggedUserId() userId: string) {
        return this.userService.getUserById(userId);
    }
}
