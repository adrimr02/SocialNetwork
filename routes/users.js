const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

//Get user
router.get('/:id', (req, res) => {
  try {
    const user = User.findById(req.params.id);
    const { password, updatedAt, ...other} = user._doc;
    res.status(200).json({ user: other });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
});

//Update user
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch(err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }

      try {
        const user = User.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json({user, message: 'Account has been updated!'});
      } catch(err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }

    }
  } else {
    return res.status(403).json({ error: 'You can only update your account!' });
  }
});

//Delete user
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const user = User.findByIdAndDelete(req.params.id);
        res.status(200).json({user, message: 'Account has been updated!'});
      } catch(err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }
  } else {
    return res.status(403).json({ error: 'You can only update your account!' });
  }
});

//Follow user
router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user)
        return res.status(404).json({ error: 'This user does not exist!' });

      if (user.followers.includes(req.body.userId))
        return res.status(404).json({ error: 'You already follow this user' });
      
      await user.updateOne({ $push: { followers: req.body.userId } });
      await currentUser.updateOne({ $push: { following: req.params.id } });
      res.status(200).json({ message: 'Following user!' });

    } catch(err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(403).json({ error: 'You can\'t follow yourself!' });
  }
});

//Unfollow user
router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user)
        return res.status(404).json({ error: 'This user does not exist!' });

      if (!user.followers.includes(req.body.userId))
        return res.status(404).json({ error: 'You do not follow this user' });
      
      await user.updateOne({ $pull: { followers: req.body.userId } });
      await currentUser.updateOne({ $pull: { following: req.params.id } });
      res.status(200).json({ message: 'User unfollowed!' });

    } catch(err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(403).json({ error: 'You can\'t follow yourself!' });
  }
});

module.exports = router;