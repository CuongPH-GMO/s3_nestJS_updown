import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  AWS_S3_BUCKET_NAME = process.env.S3_BUCKET || 'apkfolder';
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIAJEKXGZYVNKC5UERA',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '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'
  })
  getHello(): string {
    return 'Hello World!';
  }

  public async uploadFile(file: any):Promise<any> {
    const data = await this.s3.putObject({
      Bucket: this.AWS_S3_BUCKET_NAME,
      Key: file.originalname,
      ACL: 'public-read',
      Body: file.buffer,
    }).promise();
    return data;
  }

  public download(key) {
    const bucketParams = {Key: key, Bucket: this.AWS_S3_BUCKET_NAME};
    return this.s3.getObject(bucketParams);
  }

  public getList() {
    return this.s3.listObjects({Bucket: this.AWS_S3_BUCKET_NAME}).promise();
  }
}
