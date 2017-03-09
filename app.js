// Import modules
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from 'config';

const app = express();
// Configure Application
const serverConfig = config.get('App.server'),
      dbConfig = config.get('App.dbConfig');

app.set('mediastorConfig', config.get('App.mediastor'));
app.set('types', config.get('App.mediastor.types'));

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to database (MongoDB)
mongoose.Promise = global.Promise;
mongoose.connect(`${dbConfig.host}/${dbConfig.database}`, {});
const db = mongoose.connection;
db.on('error', (err) => {
    throw err;
});

// Routes
require('./routes/index')(app);
require('./routes/videos')(app);
require('./routes/images')(app);
require('./routes/documents')(app);

const server = app.listen(serverConfig.port);

module.exports = server;