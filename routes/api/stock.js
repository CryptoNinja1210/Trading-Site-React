const express = require('express');
const router = express.Router();
// const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// const Post = require('../../models/Post');
// const User = require('../../models/User');
// const checkObjectId = require('../../middleware/checkObjectId');

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.post('/', auth, async (req, res) => {
  try {
    // console.log(stockServer);
    const stock = req.body;
    // console.log(req)
    // const posts = await Post.find().sort({ date: -1 });
    res.json(req.body);
  } catch (err) {
    // console.error(err.message);
    console.log('backend-error')
    res.status(500).send('Server Error');
  }
});

module.exports = router;
