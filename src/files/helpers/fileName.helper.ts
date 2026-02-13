import { v4 as uuid } from 'uuid';

export const fileName = (req: Express.Request, file: Express.Multer.File, callback: Function) => {

    // Si no hay archivo, no hacemos nada
    if (!file) return callback(new Error('File is empty'), false);

    // 1. Sacamos la extensión (jpg, png)
    const fileExtension = file.mimetype.split('/')[1];

    // 2. Generamos un nombre único: 8273-1238-1234.jpg
    const fileName = `${uuid()}.${fileExtension}`;

    // 3. Devolvemos el nuevo nombre
    callback(null, fileName);
}