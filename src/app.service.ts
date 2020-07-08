import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

const AWS_S3_BUCKET_NAME = 'apkfolder';
const s3 = new AWS.S3({
  accessKeyId: 'AKIAJEKXGZYVNKC5UERA',
  secretAccessKey: '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'
})
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  public async uploadFile(file: any):Promise<string> {
    const data = await s3.putObject({
      Bucket: AWS_S3_BUCKET_NAME,
      Key: file.originalname,
      ACL: 'public-read',
      Body: file.buffer,
    }).promise().then(
      data => {
        console.log(data);
        return ;
      },
      err => {
        console.log(err);
        return err;
      },
    );
    return data;
  }

  public download(key) {
    const bucketParams = {Key: key, Bucket: AWS_S3_BUCKET_NAME};
    return s3.getObject(bucketParams);
  }
}
