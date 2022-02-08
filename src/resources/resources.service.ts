import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/auth/mail/mail.service';
import { Repository } from 'typeorm';
import * as reader from 'xlsx';
import { CreateResourceInput } from './dto/create-resource.input';
import { UpdateResourceInput } from './dto/update-resource.input';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepo: Repository<Resource>,
    private mailService: MailService,
  ) {}
  create(createResourceInput: CreateResourceInput) {
    const CREATE = this.resourceRepo.create(createResourceInput);
    return this.resourceRepo.save(CREATE);
  }
  async findByEmail(careatoremail: string) {
    return this.resourceRepo.findOne(careatoremail);
  }

  async createDocumentInLocalxl(userid: string, filename: string) {
    const file = reader.readFile(`./assets/${filename}`, { cellDates: true });
    const sheets = file.SheetNames;
    let data = [];
    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]], {
        dateNF: 'yyyy-mm-dd',
      });

      temp.forEach((res: any) => {
        var stat = '';

        if (res.Bench_Status == '') {
          stat = 'V';
        } else if (res.Bench_Status.toLowerCase() == 'NB') {
          stat = 'N';
        } else if (res.Bench_Status.toLowerCase() == 'AL') {
          stat = 'A';
        } else if (res.Bench_Status.toLowerCase() == 'AV') {
          stat = 'V';
        } else if (res.Bench_Status.toLowerCase() == 'LV') {
          stat = 'L';
        } else if (res.Bench_Status.toLowerCase() == 'BL') {
          stat = 'B';
        } else {
          stat = 'V';
        }

        data.push({
          id: res.id,
          fullname: res.Full_Name,
          empid: res.Emp_ID,
          doj: res.DoJ,
          gender: res.Gender,
          primaryphonenumber: res.Phone_Number,
          secondaryphonenumber: res.Secondary_phone_Number,
          emailid: res.Email_ID,
          personalemailid: res.Personal_EmailID,
          designation: res.Designation,
          accname: res.Account_Name,
          accountmanagerid: res.Account_Manager,
          skills: res.Skill_Category,
          projectreleasedate: res.Project_Release_Date,
          projectreleasereason: res.Project_release_Reason,
          comments: res.RMG_Comments,
          statuscode: stat,
          createdby: userid,
        });
      });
    }

    const CREATE = this.resourceRepo.create(data);

    return this.resourceRepo.save(CREATE);
  }

  findAll() {
    return this.resourceRepo.find({
      relations: ['document', 'notes', 'accmanager'],
    });
  }
  findbyAccountManger(accountmanagerid: string) {
    return this.resourceRepo.find({
      where: {
        accountmanagerid,
      },
      relations: ['document', 'notes', 'accmanager'],
    });
  }

  findOne(id: number) {
    return this.resourceRepo.findOne(id, {
      relations: ['document', 'notes', 'accmanager'],
    });
  }

  findActiveResource(isactive: boolean) {
    return this.resourceRepo.find({
      where: {
        isactive: isactive,
      },
      relations: ['document', 'notes', 'accmanager'],
    });
  }
  update(id: number, updateResourceInput: UpdateResourceInput) {
    const UPDATE = this.resourceRepo.create(updateResourceInput);
    return this.resourceRepo.update(id, UPDATE);
  }

  remove(id: number) {
    return this.resourceRepo.delete(id);
  }
  findAMACount(accountmanagerid: string) {
    return this.resourceRepo.count({
      where: {
        statuscode: 'A',
        accountmanagerid,
      },
    });
  }
  findAMVCount(accountmanagerid: string) {
    return this.resourceRepo.count({
      where: {
        statuscode: 'V',
        accountmanagerid,
      },
    });
  }
  findAMBCount(accountmanagerid: string) {
    return this.resourceRepo.count({
      where: {
        statuscode: 'B',
        accountmanagerid,
      },
    });
  }
  findAMLCount(accountmanagerid: string) {
    return this.resourceRepo.count({
      where: {
        statuscode: 'L',
        accountmanagerid,
      },
    });
  }
  findACount() {
    return this.resourceRepo.count({
      where: {
        statuscode: 'A',
      },
    });
  }
  findVCount() {
    return this.resourceRepo.count({
      where: {
        statuscode: 'V',
      },
    });
  }
  findBCount() {
    return this.resourceRepo.count({
      where: {
        statuscode: 'B',
      },
    });
  }
  findLCount() {
    return this.resourceRepo.count({
      where: {
        statuscode: 'L',
      },
    });
  }
}
