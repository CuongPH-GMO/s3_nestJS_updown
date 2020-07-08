import { Controller, Get, Post, UploadedFile, UseInterceptors, Res, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import {FileInterceptor} from '@nestjs/platform-express';
import { response } from 'express';
@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('list')
  async getList() {
    const list = await this.appService.getList();
    console.log(list)
    for (let index = 0; index < list['Contents'].length; index++) {
      console.log(list['Contents'][index]['Key'])        
    }
  }
  @Get('download') 
  download(@Query('filename') filename, @Res() res) {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.attachment(filename);
    this.appService.download(filename).createReadStream().pipe(res);
    return res.end();
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any, @Res() res) {
    this.appService.uploadFile(file).then(data => {
      return res.json({
        code: 200,
        message: 'success',
        data
      })
    }).catch(e => {
      return res.json({
        code: e.statusCode,
        message: e,
      })
    });
  }
}
