import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter.helper';
import { fileName } from './helpers/fileName.helper';

@ApiTags('Files - Get and Upload')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('product')
  @ApiConsumes('multipart/form-data') // Le dice a Swagger que enviamos un archivo
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // Le dice a Swagger que muestre el botón de "Seleccionar Archivo"
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,// <--- Aquí conectamos tu filtro de seguridad
    // 3. Configuración de guardado
    storage: diskStorage({
      destination: './static/products', // Carpeta donde se guardan
      filename: fileName // Tu función para renombrar
    })
  }))
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
  ) {

    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    // --- CAMBIA ESTO ---
    // Antes: return { fileName: file.originalname };

    // Ahora: Devolvemos el nombre con el que SE GUARDÓ (el UUID)
    const secureUrl = `${file.filename}`;

    return {
      secureUrl
    };
    // -------------------
  }
}