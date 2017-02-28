const fs = require('fs'),
    client = require('../manta/mantaClient'),
    crypto = require('crypto'),
    MemoryStream = require('memorystream');


module.exports = (upload, callback) => {
    let dirs = { 
        mp4: "videos", 
        mov: "videos", 
        mpeg: "videos", 
        avi: "videos",
        jpg: "images", 
        jpeg: "images", 
        txt: "documents",
        doc: "documents", 
        docx: "documents",
        pdf: "documents" 
    };

    const filename = upload.filename,
    fileId = upload._id,
    localPath = upload.path,
    ext = upload.originalname.split('.').slice(-1)[0],
    basePath = '/uqamoon1/public/',
    stream = new MemoryStream(),
    uploadPath = basePath + dirs[ext] + '/' + fileId + '.' + ext;

        fs.readFile(localPath, (err, file) => {
            if (err) throw err;
            opts = {
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
                callback(res.complete);
            });
            stream.end(file);
        });
}