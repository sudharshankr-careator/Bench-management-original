import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/userrole.entity';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { UserRoleService } from './userrole.service';
import { UserRoleResolver } from './userrole.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRole])],
  providers: [
    UserResolver,
    UserService,
    RoleService,
    RoleResolver,
    UserRoleService,
    UserRoleResolver,
  ],
  exports: [UserService, UserRoleService],
})
export class UserModule {}
