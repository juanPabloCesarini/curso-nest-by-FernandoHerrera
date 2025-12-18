import { BadRequestException } from "@nestjs/common";

export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
  //console.log({ file });
    if (!file) {    
        return callback(new Error('File is empty'), false);
    }
    const fileExt = file.mimetype.split('/')[1];
    const allowedExt = ['jpg', 'jpeg', 'png', 'gif','webp'];

    if (!allowedExt.includes(fileExt)) {
        return callback(new BadRequestException(`File type ${fileExt} is not allowed`), false);
    }
  callback(null, true);
}