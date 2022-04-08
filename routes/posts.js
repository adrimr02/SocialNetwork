const router = require('express').Router();

const Post = require('../models/Post');
const User = require('../models/User');

//Create a post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({ post: savedPost, message: 'Post created' });
  } catch(err) {

  }
});

//Get timeline posts
router.get('/timeline/:userid', async (req, res) => {
  let postArray = []
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({userId: currentUser._id});
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

//Get a post
router.get('/:id', async (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ error: 'The post does not exist!' });

    res.status(200).json({ post });
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

//Update a post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ error: 'The post does not exist!' });

    if (post.userId !== req.body.userId)
      return res.status(403).json({ error: 'You can only update your own posts!' });
    
    await post.updateOne({ $set: req.body });
    res.status(200).json({ message: 'Post updated succesfully!' });

  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

//Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ error: 'The post does not exist!' });

    if (post.userId !== req.body.userId)
      return res.status(403).json({ error: 'You can only delete your own posts!' });
    
    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted succesfully!' });

  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

//Like a post
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ error: 'The post does not exist!' });

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } })
      res.status(200).json({ message: 'The post has been liked' });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      res.status(200).json({ message: 'The post has been disliked' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;