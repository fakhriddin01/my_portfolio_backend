import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid'

@Injectable()
export class FilesService {
    async createFile(file: any): Promise<string> {
        try {
            const fileName = uuid.v4() + file.originalname;
            const filePath = path.resolve(__dirname,'..', '..', 'static');
            
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true});
            }
            fs.writeFileSync(path.join(filePath,fileName), file.buffer);
            console.log(fileName, '>>>>>>>>>>>>>>>>>>>>>');
            return fileName;
            
        } catch (error) {
            throw new HttpException(
                "Fileni yoziwda xatlik",
                HttpStatus.INTERNAL_SERVER_ERROR
            )}
        }


        async removeFile(fileName: string){
            try {
                const filePath = path.resolve(__dirname, '..', '..', 'static');
                fs.rmSync(path.join(filePath, fileName));
                console.log("file deleted");
                return fileName;
            } catch (error) {
                throw new HttpException(
                    "Fileni o`chirishda xatlik",
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            }
        }

        async saveImage(content:string){
            const base64Regex = /src="data:([A-Za-z-+\/]+);base64,([^"]+)"/g;
            const mediaFiles = [];
            let match:any;
            while ((match = base64Regex.exec(content)) !== null) {
                const contentType = match[1];
                const data = match[2];

                mediaFiles.push({
                    contentType,
                    data
            });
            }
            
            mediaFiles.forEach((media, index) => {
                const { contentType, data } = media;
                const buffer = Buffer.from(data, 'base64');
                const extension = contentType.split('/')[1];
                const filename = `${uuid.v4()}.${extension}`; // Unique filename using UUIDv4
                
                const filePath = path.resolve(__dirname,'..', '..', 'static');
                if(!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true});
                }
                fs.writeFileSync(path.join(filePath,filename), buffer);
            
                console.log(`File saved: ${filename}`);
                
                // Replace the image source with the unique filename
                const localPath = `${process.env.FILEPATH}/${filename}`;
                
                content = content.replace(`data:${contentType};base64,${data}`, localPath);
              });
            
              return content;
        }
    }

   

