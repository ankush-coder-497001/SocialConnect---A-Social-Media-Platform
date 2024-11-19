const PostModel = require('../Models/PostModel');
const UserModel = require('../Models/UserModel');

const CreatePost = async (req,res)=>{
      try {
        const { user, content, postType, hashtags } = req.body;
        const file = req.file ? req.file.path : null;
        const post = new PostModel({
          user,
          content,
          postType,
          file,
          hashtags,
        });
        await post.save();
        res.status(201).json({message: "Post created successfully"});
      } catch (error) {
        console.log(error);
      }
}

const GetAllPost = async (req,res)=>{
  try {
    const posts = await PostModel.find().populate('user', 'name').populate('comments').exec();
    res.status(200).json({ message: "All posts fetched successfully!", posts });
  } catch (error) {
    console.log(error);
  }
}

const GetPostById = async (req,res)=>{
  try {
    const post = await PostModel.findById(req.params.id).populate('user', 'name').populate('comments').exec();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post fetched successfully!", post });
  } catch (error) {
    console.log(error);
  }
}

const UpdatePost = async (req, res) => {
  try {
    const { id, content, hashtags } = req.body;

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { content, hashtags, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully!", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Failed to update post", error });
  }
};

const DeletePost = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedPost = await PostModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully!", post: deletedPost });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error });
  }
};


const LikePost = async (req, res) => {
  try {
    const { id, userId } = req.body;

    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    res.status(200).json({ message: "Post liked successfully!", post });
  } catch (error) {
    res.status(500).json({ message: "Failed to like post", error });
  }
};


const UnlikePost = async (req, res) => {
  try {
    const { id, userId } = req.body;

    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
      await post.save();
    }

    res.status(200).json({ message: "Post unliked successfully!", post });
  } catch (error) {
    res.status(500).json({ message: "Failed to unlike post", error });
  }
};


module.exports = {
  CreatePost,
  GetAllPost,
  GetPostById,
  UpdatePost,
  DeletePost,
  LikePost,
  UnlikePost
};