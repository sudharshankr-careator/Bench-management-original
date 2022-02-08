import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Resource } from './entities/resource.entity';
import { ResourceController } from './resource.controller';
import { ResourcesResolver } from './resources.resolver';
import { ResourcesService } from './resources.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resource]), UserModule],
  controllers: [ResourceController],
  providers: [ResourcesResolver, ResourcesService],
})
export class ResourcesModule {}
