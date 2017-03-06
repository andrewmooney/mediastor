/**
 * This is part of the Architecture API.
 * It should be moved to it's own API at a later date.
 */
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    name: { type: String, required: true },
    videos: [String],
    resources: [String]
});

module.exports = mongoose.model('playlist', PlaylistSchema);
