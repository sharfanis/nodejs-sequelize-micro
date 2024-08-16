const { where } = require('sequelize');
const models = require('../models');
const validator = require('fastest-validator');


function index(req,res) {
  res.status(200).send("ping");
}

function save(req,res) {
   const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
    userId: 1
   }


   const schema = {
     title : {type:"string", optional : false, max:"100"},
     content: {type:"string", optional: false, max: "500"},
     categoryId: {type: "number", optional: false}
   }

   const valiatorObj = new validator();
// If validation passes then it return TRUE else array of errors.
   const validationResponse = valiatorObj.validate(post, schema);

   if( validationResponse !== true) {
     return res.status(400).json({
      message: "Validation failed",
      error: validationResponse
     })
   }

   models.Post.create(post).then(result => {
     res.status(201).json({
      message: "Post Created Successfully!",
      post:result
     })
   }).catch(error => {
    res.status(500).json({
      message: "Post Creation failed!",
      post:error
     })
   });
}


// Get Post by Id
function showPostById(req ,res) {
  const id = req.params.id;
  
  models.Post.findByPk(id).then((result) => {
    if(result){
    res.status(200).json( result );
    } else {
      res.status(400).json({
        message: " Post Id doesn't exist !",
       });
    }
  }).catch(error => {
    res.status(500).json({
      message: " Post Id doesn't exist !",
      post:error
     });
  });
}

// Get all posts
function getAllPosts(req, res) {
  models.Post.findAll().then((result) => {
    res.status(200).json( result );
  }).catch(error => {
    res.status(500).json({
      message: " Can't fetch posts !",
      post:error
     });
  });
}

// Update a post
function updatePost(req,res) {

  const postId = req.params.id;

  const updatedPost = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
   }

   const userId = 6;

   const schema = {
    title : {type:"string", optional : false, max:"100"},
    content: {type:"string", optional: false, max: "500"},
    categoryId: {type: "number", optional: false}
  }

  const valiatorObj = new validator();
// If validation passes then it return TRUE else array of errors.
  const validationResponse = valiatorObj.validate(updatedPost, schema);

  if( validationResponse !== true) {
    return res.status(400).json({
     message: "Validation failed",
     error: validationResponse
    })
  }

   models.Post.update(updatedPost, { where : {id: postId , userId:userId}}).then((result) => {
    res.status(200).json({
      message: "Successfully updated post !",
      post:updatedPost
    });
  }).catch(error => {
    res.status(500).json({
      message: "Failed to update Post !",
      post:error
     });
  });
}

// Delete a post
function deletePost(req,res) {
  const postId = req.params.id;

  const userId = 1;

  models.Post.destroy({where : {id: postId, userId: userId}}).then((result) => {
    res.status(200).json({
      message: "Successfully deleted post",
    });
  }).catch(error => {
    res.status(500).json({
      message: "Failed to delete Post !",
      post:error
     });
  });
}



module.exports={
index:index,
save:save,
showPostById: showPostById,
getAllPosts:getAllPosts,
updatePost:updatePost,
deletePost:deletePost
}