import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatusInput } from './dto/create-status.input';
import { UpdateStatusInput } from './dto/update-status.input';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status) private readonly statusRepo: Repository<Status>,
  ) {}
  async create(createStatusInput: CreateStatusInput) {
    const CREATE = await this.statusRepo.create(createStatusInput);
    return this.statusRepo.save(CREATE);
  }

  findAll() {
    return this.statusRepo.find();
  }

  findOne(statuscode: string) {
    return this.statusRepo.findOne(statuscode);
  }

  update(statuscode: string, updateStatusInput: UpdateStatusInput) {
    const UPDATE = this.statusRepo.create(updateStatusInput);
    return this.statusRepo.update(statuscode, UPDATE);
  }

  remove(statuscode: string) {
    return this.statusRepo.delete(statuscode);
  }
}
