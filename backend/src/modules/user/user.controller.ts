import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { LoggedUserId } from '../../shared/decorators/LoggedUserId';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/me')
    me(@LoggedUserId() userId: string) {
        return this.userService.getUserById(userId);
    }
}
