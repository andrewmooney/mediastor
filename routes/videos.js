import Video from '../models/video';

module.exports = (app) => {
    app.get('/videos', (req, res) => {
        Video.find((err, videos) => {
            if (err) res.status(500).json( { "message": err }); 
            return res.status(200).json(videos);
        })
    });

    app.get('/videos/:id', (req, res) => {
        Video.findById(req.params.id, (err, video) => {
            if (err) res.status(500).json( { "message": err }); 
            return res.status(200).json(video);
        });
    });

    app.post('/videos', (req, res) => {
        const video = new Video(req.body);
        video.save((err, result) => {
            if (err) res.status(500).json( { "message": err }); 
            return res.status(201).json({ "message": result });
        });
    });

    app.patch('/videos/:id', (req, res) => {
        Video.update({_id: req.params.id}, { $set: req.body }, (err, result) => {
            if (err) res.status(500).json( { "message": err }); 
            return res.status(200).json({ "message": result });
        });
    });

    app.delete('/videos/:id', (req, res) => {
        Video.findByIdAndRemove(req.params.id, (err) => {
            if (err) res.status(500).json( { "message": err }); 
            return res.status(200).json({ "message": "Video removed from database" })
        });
    });
};