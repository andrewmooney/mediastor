import Image from '../models/image';

module.exports = (app) => {
    app.get('/images', (req, res) => {
        Image.find((err, images) => {
            if (err) return res.status(500).json( { "message": err });
            return res.status(200).json(images);
        })
    });

    app.get('/images/:id', (req, res) => {
        Image.findById(req.params.id, (err, image) => {
            if (err) return res.status(500).json( { "message": err });
            return res.status(200).json(image);
        });
    });

    app.post('/images', (req, res) => {
        const image = new Image(req.body);
        image.save((err, result) => {
            if (err) return res.status(500).json( { "message": err });
            return res.status(200).json({ message: result});
        });
    });

    app.patch('/images/:id', (req, res) => {
        Image.update({_id: req.params.id}, { $set: req.body }, (err, result) => {
            if (err) return res.status(500).json( { "message": err });
            return res.status(200).json({ message: result });
        });
    });

    app.delete('/images/:id', (req, res) => {
        Image.findByIdAndRemove(req.params.id, (err) => {
            if (err) return res.status(500).json( { "message": err });
            return res.status(200).json({ "message": "Image deleted"});
        })
    })
};