import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
  ) {}
  create(createNoteInput: CreateNoteInput) {
    const create = this.noteRepo.create(createNoteInput);
    return this.noteRepo.save(create);
  }

  findAll() {
    return this.noteRepo.find();
  }

  findOne(id: number) {
    return this.noteRepo.findOne(id);
  }

  update(id: number, updateNoteInput: UpdateNoteInput) {
    const update = this.noteRepo.create(updateNoteInput);
    return this.noteRepo.update(id, update);
  }

  remove(id: number) {
    return this.noteRepo.delete(id);
  }
  findbyResourceid(resourceid: number) {
    return this.noteRepo.find({
      where: {
        resourceid: resourceid,
      },
    });
  }
}
