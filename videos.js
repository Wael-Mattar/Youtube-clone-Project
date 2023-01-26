const mongoose = require("mongoose");
const videosSchema=mongoose.Schema({

//attributes or collection
title:{
    type:String,
    maxlength:30,
},
description:{
    type:String,
},
videoPath:{
    type:String,
},
views:{
    type:Number,
    default: 15000,
},
thumbnail:{
    type:String,
},

},{timestamps:true})//created at, updated at
module.exports = mongoose.model("videos",videosSchema)

