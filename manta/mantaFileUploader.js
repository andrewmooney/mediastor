import fs from 'fs';
import client from '../manta/mantaClient';
import crypto from 'crypto';
import MemoryStream from 'memorystream';


module.exports = (upload, callback) => {

    let types = { 
        mp4: "video", 
        mov: "video", 
        mpeg: "video", 
        avi: "video",
        mj2: "video",
        wav: "audio",
        mp3: "audio",
        aiff: "audio",
        jpg: "image", 
        jpeg: "image", 
        tiff: "image",
        tif: "image",
        raw: "image",
        psd: "image",
        txt: "document",
        doc: "document", 
        docx: "document",
        pdf: "document" 
    };

    const fileId = upload._id,
    localPath = upload.path,
    ext = upload.originalname.split('.').slice(-1)[0],
    basePath = '~~/public/',
    stream = new MemoryStream(),
    uploadPath = basePath + types[ext] + 's' + '/' + fileId + '.' + ext;

        fs.readFile(localPath, (err, file) => {
            if (err) throw err;
            const opts = {
                copies: 3,
                headers: {
                    'access-control-allow-origin': '*',
                    'access-control-allow-methods': 'GET'
                },
                md5: crypto.createHash('md5').update(file).digest('base64'),
                size: Buffer.byteLength(file),
            };

            const w = client.createWriteStream(uploadPath, opts);

            stream.pipe(w);
            w.once('close', (res) => {
                callback(res.complete, uploadPath);
            });
            stream.end(file);
        });
}