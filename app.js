
const express = require('express'); //require module express
const app = express();//function
const mongoose = require("mongoose");
// declare the path 
const path = require('path');
const videos = require('./videos');//to require the collection
mongoose.connect('mongodb+srv://root:root@video.lhlwxrm.mongodb.net/?retryWrites=true&w=majority')

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "style")));
app.use(express.static(path.join(__dirname, "slick")));
app.use(express.static(path.join(__dirname, "images")));
// declare ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get('/', async (req, res) => {
    const entries = await videos.find({});//query to find all entries in the collection
    console.log(entries)
    res.render('home', { videos: entries })//render home page and send an object that contains the entries
})

app.post('/upload', async (req, res) => {
    const video = await videos.create({
        title: req.body.videotitle,
        description: req.body.description,
        videoPath: req.body.videofile,
        thumbnail: req.body.image,
    })

    res.redirect('/')
})
app.get('/form', async (req, res) => {

    res.render('form')
})
var displayId;
app.get('/view/:_id', (req, res) => {
    displayId = req.params._id.slice(1, req.params._id.length);
    res.redirect('/display')
})

app.get('/display', async (req, res) => {
    const entry = await videos.findById(displayId)
    console.log(entry)
    res.render('display', {
        entry: entry
    })
})

app.listen(3003);