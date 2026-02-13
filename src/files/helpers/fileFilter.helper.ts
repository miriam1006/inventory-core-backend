export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {

    // 1. Si no viene archivo, rechazamos
    if (!file) return callback(new Error('File is empty'), false);

    // 2. Revisamos la extensión (MimeType)
    const fileExtension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (validExtensions.includes(fileExtension)) {
        // 3. ¡Es válido! Lo dejamos pasar (true)
        return callback(null, true);
    }

    // 4. No es válido (false)
    callback(null, false);

}