const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

//REGISTER NEW USER
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    const user = await newUser.save();
    res.status(200).json({ user, message: 'Account has been created!'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

//LOGIN USER
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      res.status(400).json({ error: 'Wrong password' });
      return;
    }
    res.status(200).json({ user, message: 'You have logged in succesfully!' });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;