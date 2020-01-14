const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Resource = new Schema(
    {
        name: { type: String, required: true },
        link: { type: String, required: true},
        note: { type: String, required: false},
        tags: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('resources', Resource)