const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    PostImage: { type: String, required: true },
    likes: Number,
    date: Date
}, { "collection": "post" });

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;