// Schema for Blog

const mongoose = require('mongoose');
// const { date } = require('@hapi/joi');
//Define a schema
const Schema = mongoose.Schema;
const blogSchema = new Schema({
 title: {
  type: String,  
  required: true,
 },
 description: {
  type: String,
  required: true
 },
 content: {
     type: String,
     trim: true,
     required: true
 },
 published_on:{
     type:Date,
     default: Date.now
 }
});
module.exports = mongoose.model('Blog', blogSchema)