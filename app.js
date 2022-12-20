const express = require("express");
const app = express();
const mongoose = require("mongoose");
const postModel = require('./models/postModel');
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;



app.use(express.urlencoded())

app.use(fileupload({
    useTempFiles: true
}))

const port = process.env.PORT || 5000;
mongoose.connect('mongodb+srv://root1:test123@cluster0.edyhsj8.mongodb.net/?retryWrites=true&w=majority')

mongoose.connection.once('open', () => {
    console.log('connection established')
}).on('connectionError', (err) => {
    console.log(err);
})

mongoose.set("strictQuery", true);

// get
app.get("/form-data", async (req, res) => {
    try {
        const post = await postModel.find().sort({ date: -1 });
        res.json({
            status: "SUCCESS",
            data: post
        })
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

// Post
app.post('/form-data', async (req, res) => {
    cloudinary.config({
        cloud_name: 'djfjaumf3',
        api_key: '237915265813936',
        api_secret: 'DZuVRceZdPBaxK9cbVO5EE1JHlU'
    });

    const file = req.files.PostImage;

    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        try {
            const post = await postModel.create({
                name: req.body.name,
                location: req.body.location,
                description: req.body.description,
                PostImage: result.url,
                likes: Math.floor(Math.random() * 100),
                date: new Date()
            });
            console.log(post);
            res.json({
                status: "SUCCESS",
                data: post
            })
        } catch (e) {
            res.status(400).json({
                status: "Failed",
                message: e.message
            })
        }
        console.log(result.url);
    })


})

app.listen(port, () => {
    console.log(`App is listening at ${port}`);
})

