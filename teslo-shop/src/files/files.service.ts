import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';


@Injectable()
export class FilesService {
    getStaticProductUrl(imageName: string){

        const path= join(__dirname, '../../statics/products/', imageName);

        if (!existsSync(path)) {
            throw new BadRequestException('Image not found');
        }
        return path;
    }
 
}
