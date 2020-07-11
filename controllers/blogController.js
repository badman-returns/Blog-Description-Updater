// Contains function for CRUD Operations.

const blogModel = require('../model/blogSchema');

module.exports = {
  // Get the content with specific id
 getById: function(req, res, next) {
  console.log(req.body);
  blogModel.findById(req.params.blogId, function(err, blogInfo){
   if (err) {
    next(err);
   } else {
    res.json({status:"success", message: "Blog found!!!", data:{blogs: blogInfo}});
   }
  });
 },
//  Get all contents without id
getAll: function(req, res, next) {
  let blogList = [];
blogModel.find({}, function(err, blogs){
   if (err){
    next(err);
   } else{
    for (let blog of blogs) {
     blogList.push({id: blog._id, title: blog.title, published_on: blog.published_on, contetnt: blog.content});
    }
    res.json({status:"success", message: "Blog list found!!!", data:{blog: blogList}});
       
   }
});
 },
// Update content with specific id 
updateById: function(req, res, next) {
  blogModel.findByIdAndUpdate(req.params.blogId,{title:req.body.title, description:req.body.description, content:req.body.content}, function(err, blogInfo){
if(err)
    next(err);
   else {
    res.json({status:"success", message: "Blog updated successfully!!!", data:null});
   }
  });
 },
//  Delete content with specif id
deleteById: function(req, res, next) {
  blogModel.findByIdAndRemove(req.params.blogId, function(err, blogInfo){
   if(err)
    next(err);
   else {
    res.json({status:"success", message: "Blog deleted successfully!!!", data:null});
   }
  });
 },
// Create a new content
create: function(req, res, next) {
  blogModel.create({ title: req.body.title, description: req.body.description, content: req.body.content}, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "Blog added successfully!!!"});
      
    });
 },
}