import Doc from '../models/document';

module.exports = (app) => {
    app.get('/documents', (req, res) => {
        Doc.find((err, documents) => {
            if (err) return res.status(500).json({ "message": err });
            return res.status(200).json(documents);
        })
    });

    app.get('/documents/:id', (req, res) => {
        Doc.findById(req.params.id, (err, document) => {
            if (err) return res.status(500).json({ "message": err });
            return res.status(200).json(document);
        });
    });

    app.post('/documents', (req, res) => {
        const document = new Doc(req.body);
        document.save((err, result) => {
            if (err) return res.status(500).json({ "message": err });
            return res.status(201).json({ "message": result});
        });
    });

    app.patch('/documents/:id', (req, res) => {
        Doc.update({_id: req.params.id}, { $set: req.body }, (err, result) => {
            if (err) return res.status(500).json({ "message": err });
            return res.status(200).json({ "message": result });
        });
    });

    app.delete('/documents/:id', (req, res) => {
        Doc.findByIdAndRemove(req.params.id, (err) => {
            if (err) return res.status(500).json({ "message": err });
            return res.status(200).json({ "message": "Document removed from database" });
        })
    })
};