const express  = require('express');
const { CreatePost, GetAllPost, GetPostById, UpdatePost, DeletePost, LikePost, UnlikePost } = require('../Controllers/PostController');
const route = express.Router();
const Upload = require('../Middleware/Upload');

//endpoints

//post/endpoint
route.post('/createpost',Upload.single('file'),CreatePost);
route.get('/getallpost',GetAllPost);
route.get('/getpost/:id',GetPostById);
route.put('/updatepost',UpdatePost);
route.delete('/deletepost',DeletePost);
route.post('/likepost',LikePost);
route.post('/unlikepost',UnlikePost);


module.exports = route;