import {
    ExecutionContext,
    UnauthorizedException,
    createParamDecorator,
} from '@nestjs/common';

export const LoggedUserId = createParamDecorator<undefined>(
    (_, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const userId = request.userId;

        if (!userId) {
            throw new UnauthorizedException();
        }

        return userId;
    },
);
