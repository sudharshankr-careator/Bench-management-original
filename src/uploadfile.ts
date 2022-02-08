import { FileInterceptor } from '@nestjs/platform-express';
import { DocsSize, imageSize } from './utils/filesize';
import { DocsFileFilter, imageFileFilter } from './utils/filter';
import { DocsStorage, imageStorage } from './utils/storage';

export const UploadImageInLocalInterceptor = FileInterceptor('imagefile', {
  limits: imageSize,
  storage: imageStorage,
  fileFilter: imageFileFilter,
});

export const UploadImageInAWSInterceptor = FileInterceptor('imagefile', {
  limits: imageSize,
  fileFilter: imageFileFilter,
});

export const UploadDocInLocalInterceptor = FileInterceptor('docfile', {
  limits: DocsSize,
  storage: DocsStorage,
  fileFilter: DocsFileFilter,
});

export const UploadDocInAWSInterceptor = FileInterceptor('docfile', {
  limits: DocsSize,
  fileFilter: DocsFileFilter,
});
