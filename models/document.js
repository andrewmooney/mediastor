const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const DocumentSchema = new Schema({
        type: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        createdAt: { type: Date, required: true },
        uploadedAt: { type: Date, default: Date.now },
        mediastorName: { type: String, required: false },
        uploadedBy: { type: String, required: false },
        license: { type: String, required: false },
        format: { type: String, required: false },
        available: { type: String, default: false },
        size: ({ type: Number, required: false })
});

DocumentSchema.pre('save', function (next) {
    let now = new Date();
    if(!this.uploadedAt) {
        this.uploadedAt = now;
    };
    next();
});

module.exports = mongoose.model('document', DocumentSchema);