import mongoose from 'mongoose';
import Doc from '../models/document';

module.exports = (app) => {
    app.get('/documents', (req, res) => {
        Doc.find((err, documents) => {
           if (err) throw err; 
            res.status(200).json(documents);
        })
    });

    app.get('/documents/:id', (req, res) => {
        Doc.findById(req.params.id, (err, document) => {
            if (err) throw err;
            res.status(200).json(document);
        });
    });

    app.post('/documents', (req, res) => {
        const document = new Doc(req.body);
        document.save((err, result) => {
            if (err) res.json({ message: `There was an error adding the data to the database: ${err}`})
            return res.status(200).json({ message: result});
        });
    });

    app.patch('/documents/:id', (req, res) => {
        Doc.update({_id: req.params.id}, { $set: { available: req.body.uploaded, mediastorName: req.body.mediastorName }}, (err, result) => {
            if (err) throw err;
            return res.status(200).json({ message: result });
        });
    });
};