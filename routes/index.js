
import muploader from '../manta/mantaFileUploader';
import multer from 'multer';
import getDuration from 'get-video-duration';
import request from 'request';
import path from 'path';
import fs from 'fs';

const uploads = multer({ dest: 'uploads/' });

/**
 * Route settings
 */


module.exports = (app) => {

    /**
     * Renders API Documentation page
     */
     app.get('/', (req, res) => {
         res.sendFile(path.join(__dirname, '../views', 'index.html'));
     });

    /**
     * Renders temporary upload form for testing purposes.
     */
    app.get('/upload', (req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'upload.html'));
    });

    /**
     * Recieves file upload and file data.
     * Posts dile data to mongodb.
     * Mongo returns an _id.
     * req.file._id is updated to the _id returned by Mongo.
     * File is then passed to mantaFileUploader.
     * manataFileUploader returns a boolean for completed status.
     * If completed is true a patch request is sent to the api to update the availability field.
     * Remove file from local uploads folder. 
     */

    app.post('/', uploads.single('file'), (req, res, next) => {
        console.log(req.file);

        const ext = req.file.originalname.split('.').slice(-1)[0],
              fileType = app.settings.types[ext],
              apiHost = app.settings.mediastorConfig.apiHost,
              uri = `${apiHost}/${fileType}s`;

        req.body.type = fileType;
        req.body.size = req.file.size;
        req.body.format = ext;
        let duration = 0;

        if (fileType === 'video') {
            getDuration(req.file.path).then((dur) => {
                duration = dur;
                console.log(duration);
            });
        }

        request({ uri: uri, method: 'POST', json: req.body }, (err, htmlRes, body) => {
            if (err) throw err;
            req.file._id = body.message._id;
            console.log(req.file._id)
            muploader(req.file, (upres, uploadPath) => {
                if (upres) {
                    req.body.uploaded = upres;
                    req.body.mediastorName = `${body.message._id}.${ext}`;
                    req.body.duration = duration;
                    req.body.fileLocation = uploadPath;
                    request({ uri: `${uri}/${body.message._id}`, method: 'PATCH', json: req.body }, (err, htmlRes, body) => {
                        if (err) throw err;
                        fs.unlink(req.file.path, (err) => {
                            if (err) throw err;

                            return res.status(200).json({ message: "File upload successful" });
                        });
                    });
                };
            });
        });
    });
}