/**
 * This is part of the Architecture API.
 * It should be moved to it's own API at a later date.
 */
import mongoose from 'mongoose';
import Playlist from '../models/playlist';

module.exports = (app) => {
    app.get('/playlists', (req, res) => {
        Playlist.find(( err, plists ) => {
            if ( err ) return res.status(500).json({ "message" : err });
            if ( plists.length === 0) return res.status(204);

            return res.status(200).json(plists);            
        });
    });

    app.get('/playlists/:id', (req, res) => {
        Playlist.findById( req.params.id, ( err, plist) => {
            if ( err ) return res.status(500).json({ "message" : err });
            if ( !plist ) return res.status(204);

            return res.status(200).json(plist);
        });
    });

    app.post('/playlists', (req, res) => {
        const plist = new Playlist(req.body);
        plist.save( (err, result) => {
            if ( err ) return res.status(500).json({ "message" : err });
            return res.status(200).json(result);
        });
    });

    app.patch('/playlists/:id', (req, res) => {
       Playlist.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
           if (err) return res.status(500).json({ "message" : err });
           return res.status(200).json({ "message" : "Playlist updated" });
       }) 
    });

    app.delete('/playlists/:id', (req, res) => {
        Playlist.findByIdAndRemove(req.params.id, (err) => {
            if (err) return res.status(500).json( { "message" : err });
            return res.status(200).json( { "message" : "Item removed from database" });
        })
    })
};