import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin';
import { SignupDto } from './dto/signup';
import { IsPublic } from '../../shared/decorators/isPublic';
import {
    ApiConflictResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@IsPublic()
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    @ApiOperation({ summary: 'User authentication' })
    @ApiResponse({
        status: 201,
        description: 'Provides an authentication token',
        schema: {
            type: 'object',
            properties: {
                token: { type: 'string' },
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid credentials.',
        type: ApiUnauthorizedResponse,
    })
    signin(@Body() signinDto: SigninDto) {
        return this.authService.signin(signinDto);
    }

    @Post('signup')
    @ApiOperation({ summary: 'Create the user and authenticate' })
    @ApiResponse({
        status: 201,
        description: 'Provides an authentication token',
        schema: {
            type: 'object',
            properties: {
                token: { type: 'string' },
            },
        },
    })
    @ApiResponse({
        status: 409,
        description: 'This email is already in use',
        type: ApiConflictResponse(),
    })
    create(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }
}
