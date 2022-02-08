import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadDocInLocalInterceptor } from 'src/uploadfile';
import { ResourcesService } from './resources.service';

@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourcesService) {}

  @UseInterceptors(UploadDocInLocalInterceptor)
  @Post('upload/:userid')
  uploadfile(
    @Param('userid') userid: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file, '>>');

    return this.resourceService.createDocumentInLocalxl(userid, file.filename);
  }
}
