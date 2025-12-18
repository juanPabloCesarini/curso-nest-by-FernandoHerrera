import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './fileFilter.helper';
import { diskStorage } from 'multer';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
    storage: diskStorage({
      destination: 'statics/uploads',
    })
  }))
    uploadProductImage(
      @UploadedFile() file: Express.Multer.File
    ) {

    if(!file) {
      throw new BadRequestException('File not provided or invalid');
    }
    return {
      fileName: file.originalname,
      message: 'File uploaded successfully'
    }
  }
}
