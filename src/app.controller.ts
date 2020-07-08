import { Controller, Get, Post, UploadedFile, UseInterceptors, Res, Query } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';
import {FileInterceptor} from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { get } from 'http';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('download') 
  download(@Query('filename') filename, @Res() res) {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.attachment(filename);
    return res.download(`${process.cwd()}\\asset\\${filename}`)
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('apkfile'))
  uploadFile(@UploadedFile() apkfile) {
    const directory = `${process.cwd()}\\asset\\${apkfile.originalname}`;
    const wstream = createWriteStream(directory);
    wstream.write(apkfile.buffer);
    wstream.end();
  }
}
