import mongoose from 'mongoose';
import Image from '../models/image';

module.exports = (app) => {
    app.get('/images', (req, res) => {
        Image.find((err, images) => {
           if (err) throw err; 
            res.status(200).json(images);
        })
    });

    app.get('/images/:id', (req, res) => {
        Image.findById(req.params.id, (err, image) => {
            if (err) throw err;
            res.status(200).json(image);
        });
    });

    app.post('/images', (req, res) => {
        const image = new Image(req.body);
        image.save((err, result) => {
            if (err) res.json({ message: `There was an error adding the data to the database: ${err}`})
            return res.status(200).json({ message: result});
        });
    });

    app.patch('/images/:id', (req, res) => {
        Image.update({_id: req.params.id}, { $set: { available: req.body.uploaded, mediastorName: req.body.mediastorName }}, (err, result) => {
            if (err) throw err;
            return res.status(200).json({ message: result });
        });
    });
};