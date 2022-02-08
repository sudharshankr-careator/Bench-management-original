import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { JwtSecret } from '../jwt/jwt-auth.strategy';
const logger = new Logger();
export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const requset = GqlExecutionContext.create(ctx).getContext().req;
    const header = requset.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (token == null) return requset.sendStatus(401);

    const user: any = await jwt.verify(token, JwtSecret);
    return user;
  },
);
