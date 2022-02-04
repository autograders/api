import { Injectable } from '@nestjs/common';
import * as S3 from 'aws-sdk/clients/s3';

import { AWSConfig } from '@configs/aws';

@Injectable()
export class S3Service {
  readonly s3 = new S3();

  uploadPrivateFile(filename: string, contentType: string, data: Buffer) {
    return this.s3
      .upload({
        Bucket: AWSConfig.privateBucket,
        Key: filename,
        ContentType: contentType,
        Body: data
      })
      .promise();
  }
}
