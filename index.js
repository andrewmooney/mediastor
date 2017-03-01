// Import modules
const express = require('express'),
      fs = require('fs'),
      app = express(),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      client = require('./manta/mantaClient'),
      crypto = require('crypto'),
      MemoryStream = require('memorystream'),
      config = require('config'),
      muploader = require('./manta/mantaFileUploader'),
      multer = require('multer'),
      uploads = multer({ dest: 'uploads/' }),
      getDuration = require('get-video-duration'),
      request = require('request');

// Configure Application
const serverConfig = config.get('App.server'),
      mediastorConfig = config.get('App.mediastor'),
      dbConfig = config.get('App.dbConfig'),
      types = mediastorConfig.types;

// Connect to database (MongoDB)
mongoose.connect(`${dbConfig.host}/${dbConfig.database}`, {});
const db = mongoose.connection;
db.on('error', (err) => {
    throw err;
});


// Routes
app.get('/upload', (req, res) => {
    res.sendfile('./views/index.html');
});

/*
    Recieves file upload and file data.
    Posts dile data to mongodb.
    Mongo returns an _id.
    req.file._id is updated to the _id returned by Mongo.
    File is then passed to mantaFileUploader.
    manataFileUploader returns a boolean for completed status.
    If completed is true a patch request is sent to the api to update the availability field.
*/
app.post('/', uploads.single('file'), (req, res, next) => {
    console.log(req.file);

    const ext = req.file.originalname.split('.').slice(-1)[0],
          fileType = types[ext],
          uri = `${mediastorConfig.apiHost}/${fileType}s`;

    req.body.type = fileType;
    req.body.size = req.file.size;
    req.body.format = ext,    
    duration = 0;

    if(types[ext] === 'video') {
        getDuration(req.file.path).then((dur) => {
            duration = dur;
            console.log(duration);
        });
    }

    request({ uri: uri, method: 'POST', json: req.body }, (err, htmlRes, body) => {
        if (err) throw err;
        req.file._id = body.message._id;
        muploader(req.file, (upres) => {
            if (upres) {
                req.body.uploaded = upres;
                req.body.mediastorName = `${body.message._id}.${ext}`;
                req.body.duration = duration;
                request({ uri: `${uri}/${body.message._id}`, method: 'PATCH', json: req.body }, (err, htmlRes, body) => {
                    if (err) throw err;
                    fs.unlink(req.file.path, (err) => {
                        if (err) throw err;

                        return res.status(200).json({ message: "File upload successful"});
                    });
                });
            };
        });
    });
});

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./routes/videos')(app);
require('./routes/images')(app);

app.listen(serverConfig.port);