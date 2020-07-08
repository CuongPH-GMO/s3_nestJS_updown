import { Controller, Get, Post, UploadedFile, UseInterceptors, Res, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import {FileInterceptor} from '@nestjs/platform-express';
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
    this.appService.download(filename).createReadStream().pipe(res);
    return res;
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    console.log(file)
    return await this.appService.uploadFile(file);
  }
}
