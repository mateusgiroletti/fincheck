import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/me')
    me(@Req() request: any) {
        console.log({ meUserId: request.userId });

        return this.userService.getUserById('userId');
    }
}
