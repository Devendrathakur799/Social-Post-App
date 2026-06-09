const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {

    const { text } = req.body;

    const image = req.file
      ? req.file.filename
      : "";

    if (!text && !image) {
      return res.status(400).json({
        message:
          "Text or Image required"
      });
    }

    const post = await Post.create({
      user: req.user._id,
      text,
      image
    });

    res.status(201).json(post);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


const getPosts = async (req, res) => {

  try {

    const posts = await Post.find()
      .populate(
        "user",
        "username "
      )
      .sort({
        createdAt: -1
      });

    res.json(posts);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


const likePost = async (req, res) => {

  try {

    const post =
      await Post.findById(
        req.params.id
      );

    if (!post) {
      return res.status(404).json({
        message:"Post not found"
      });
    }

    const alreadyLiked =
      post.likes.includes(
        req.user._id
      );

    if (alreadyLiked) {

      post.likes =
        post.likes.filter(
          (id) =>
          id.toString() !==
          req.user._id.toString()
        );

    } else {

      post.likes.push(
        req.user._id
      );

    }

    await post.save();

    res.json({
      likes: post.likes.length
    });

  } catch (error) {

    res.status(500).json({
      message:error.message
    });

  }

};


const addComment = async (
  req,
  res
) => {

  try {

    const { text } = req.body;

    const post =
      await Post.findById(
        req.params.id
      );

    if (!post) {

      return res.status(404).json({
        message:"Post not found"
      });

    }

    post.comments.push({

      user:req.user._id,

      username:
      req.user.username,

      text

    });

    await post.save();

    res.json(post);

  } catch (error) {

    res.status(500).json({
      message:error.message
    });

  }

};


module.exports = {
  createPost,
  getPosts,
  likePost,
  addComment
};