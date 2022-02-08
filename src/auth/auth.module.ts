import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleService } from 'src/user/userrole.service';
import { Role } from './../user/entities/role.entity';
import { UserRole } from './../user/entities/userrole.entity';
import { UserModule } from './../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { JwtAuthStrategy, JwtSecret } from './jwt/jwt-auth.strategy';

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: JwtSecret,
      signOptions: { expiresIn: '36000s' },
    }),
    PassportModule,
    TypeOrmModule.forFeature([UserRole, Role]),
  ],
  controllers: [],
  providers: [
    AuthService,
    AuthResolver,
    JwtAuthService,
    JwtAuthStrategy,
    UserRoleService,
  ],
})
export class AuthModule {}
