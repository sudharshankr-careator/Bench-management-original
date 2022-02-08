import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Note } from './entities/note.entity';
import { NotesResolver } from './notes.resolver';
import { NotesService } from './notes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), UserModule],
  providers: [NotesResolver, NotesService],
})
export class NotesModule {}
