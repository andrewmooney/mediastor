const mongoose = require('mongoose'),
    Video = require('../models/video');

module.exports = (app) => {
    app.get('/videos', (req, res) => {
        Video.find((err, videos) => {
           if (err) throw err; 
            res.status(200).json(videos);
        })
    });

    app.get('/videos/:id', (req, res) => {
        Video.findById(req.params.id, (err, video) => {
            if (err) throw err;
            res.status(200).json(video);
        });
    });

    app.post('/videos', (req, res) => {
        const video = new Video(req.body);
        video.save((err, result) => {
            if (err) res.json({ message: `There was an error adding the data to the database: ${err}`})
            return res.status(200).json({ message: result});
        });
    });

    app.patch('/videos/:id', (req, res) => {
        Video.update({_id: req.params.id}, { $set: { available: req.body.uploaded, mediastorName: req.body.mediastorName, duration: req.body.duration }}, (err, result) => {
            if (err) throw err;
            return res.status(200).json({ message: result });
        });
    });
};