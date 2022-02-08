import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import {
  UploadDocInAWSInterceptor,
  UploadDocInLocalInterceptor,
} from 'src/uploadfile';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private doumentService: DocumentService) {}

  @UseInterceptors(UploadDocInLocalInterceptor)
  @Post('resource/:userid')
  uploadfile(
    @Param('userid') userid: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file, '>>');

    return this.doumentService.createDocumentInLocal(userid, file);
  }

  @UseInterceptors(UploadDocInLocalInterceptor)
  @Patch('resource/:userid')
  updateuploadfile(
    @Param('userid') userid: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file, '>>');

    return this.doumentService.updateDocument(userid, file);
  }

  @UseInterceptors(UploadDocInAWSInterceptor)
  @Post('upload-resume-to-aws/:userid')
  uploadOtherDocInAWS(
    @Param('userid') userid: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.doumentService.createDocumentInAWS(userid, file);
  }

  @UseInterceptors(UploadDocInAWSInterceptor)
  @Patch('update-resume-in-aws/:userid/:docId')
  updateOtherDocInAWS(
    @Param('userid') userid: any,
    @Param('docId') docId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.doumentService.updateDocumentInAWS(userid, file, docId);
  }

  @Get('doc-file-from-aws/:usrId/:fileName')
  async getDocFileFromAWS(
    @Param('usrId') usrId: string,
    @Param('fileName') fileName: string,
    @Res() res: any,
  ): Promise<any> {
    const awsFileKey = `document/${usrId}/${fileName}`;
    const s3 = new AWS.S3();
    const bucketParams = {
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: awsFileKey,
    };

    s3.getObject(bucketParams, function (err, data) {
      if (err) {
        return res.json({
          success: false,
          error: err,
        });
      } else {
        res.attachment(awsFileKey);
        s3.getObject(bucketParams).createReadStream().pipe(res);
      }
    });
  }
}
