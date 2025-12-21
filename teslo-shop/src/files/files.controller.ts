import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer} from './helpers';
import { diskStorage } from 'multer';
import express from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly ConfigService: ConfigService
  ) { }

  @Get('product/:imageName')
  findProductImage(
    @Res() res: express.Response,
    @Param('imageName') imageName: string
  ) {
    const path = this.filesService.getStaticProductUrl(imageName);
    
   res.sendFile(path);
    return res;
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
    storage: diskStorage({
      destination: 'statics/products',
      filename: fileNamer
    })
  }))
    uploadProductImage(
      @UploadedFile() file: Express.Multer.File
    ) {

    if(!file) {
      throw new BadRequestException('File not provided or invalid');
    }
    const secureUrl = `${this.ConfigService.get('HOST_API')}/files/product/${file.filename}`;
    return {
      secureUrl
    }
  }
}
