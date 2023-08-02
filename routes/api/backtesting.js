const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const fs = require('fs')

const Strategy = require('../../models/Strategy');
const User = require('../../models/User');

// @route    POST api/backtesting/strategy
// @desc     Create a strategy
// @access   Private
router.post(
	'/strategy',
	auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');
			console.log(req.body)

			const newStrategy = {};
			newStrategy.user = req.user.id;
			newStrategy.key = 123;
			newStrategy.name = "Custom Strategy1";
			newStrategy.lastTest = "Test 1";
			// newStrategy.lastTestTime: "5/26/2023 11:58:AM";
			newStrategy.totalTests = 1;
			newStrategy.comments = "";
			newStrategy.symbolsForPerformanceChart = "SPX Xo";

			newStrategy.tests = {};
			newStrategy.tests.name = "Test 1";
			newStrategy.tests.status = "Complete";
			newStrategy.tests.symbols = "Nasdaq GM Nasdaq GS NYSE";
			newStrategy.tests.criteria = "B  Close xa 100 in last 1 bars";
			newStrategy.tests.prioritizeSymbols = "Highest SMA (Volume 30)";
			newStrategy.tests.testPeriods = "4/13/2023 - 5/12/2023";
			newStrategy.tests.startingEquity = 1_000_000;
			newStrategy.tests.positionSizing = "10L 10S % Current Equity";
			newStrategy.tests.totalProfit = -7_548.53;
			newStrategy.tests.openProfit = 15_204.20;
			newStrategy.tests.returnOnEquity = -0.75;
			newStrategy.tests.annualizedReturn = -8.81;
			newStrategy.tests.maxDrawdown = -2.55;
			newStrategy.tests.sharpeRatio = -0.64;
			newStrategy.tests.percentProfitable = 18.18;
			newStrategy.tests.winningLosingProfitRatio = 0.57;
			

			const strategy = await new Strategy(newStrategy).save();
			console.log(strategy);
			res.json(strategy);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    GET api/backtesting
// @desc     Get all defaultStrategies
// @access   Private
router.get('/defaultStrategies', auth, async (req, res) => {
    try {
        fs.readFile('./routes/fakedb/defaultStrategies.json','utf8',(err, jsonString) => {
            if(err) {
                console.log("Error reading defaultStrategies file from disk", err);
                return;
            }
            try {
                const data = JSON.parse(jsonString);
                res.json(data);
            } catch (err) {
                console.log('Error parsing JSON string', err);
            }
        });
    } catch (err) {
        // console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/backtesting
// @desc     Get all strategies
// @access   Private
router.get('/strategies', auth, async (req, res) => {
    try {
        fs.readFile('./routes/fakedb/strategies.json','utf8',(err, jsonString) => {
            if(err) {
                console.log("Error reading strategies file from disk", err);
                return;
            }
            try {
                const data = JSON.parse(jsonString);
                res.json(data);
            } catch (err) {
                console.log('Error parsing JSON string', err);
            }
        });
    } catch (err) {
        // console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// // @route    GET api/posts/:id
// // @desc     Get post by ID
// // @access   Private
// router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ msg: 'Post not found' });
//     }

//     res.json(post);
//   } catch (err) {
//     console.error(err.message);

//     res.status(500).send('Server Error');
//   }
// });

// // @route    DELETE api/posts/:id
// // @desc     Delete a post
// // @access   Private
// router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ msg: 'Post not found' });
//     }

//     // Check user
//     if (post.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'User not authorized' });
//     }

//     await post.remove();

//     res.json({ msg: 'Post removed' });
//   } catch (err) {
//     console.error(err.message);

//     res.status(500).send('Server Error');
//   }
// });

// // @route    PUT api/posts/like/:id
// // @desc     Like a post
// // @access   Private
// router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Check if the post has already been liked
//     if (post.likes.some((like) => like.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: 'Post already liked' });
//     }

//     post.likes.unshift({ user: req.user.id });

//     await post.save();

//     return res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route    PUT api/posts/unlike/:id
// // @desc     Unlike a post
// // @access   Private
// router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Check if the post has not yet been liked
//     if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: 'Post has not yet been liked' });
//     }

//     // remove the like
//     post.likes = post.likes.filter(
//       ({ user }) => user.toString() !== req.user.id
//     );

//     await post.save();

//     return res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route    POST api/posts/comment/:id
// // @desc     Comment on a post
// // @access   Private
// router.post(
//   '/comment/:id',
//   auth,
//   checkObjectId('id'),
//   check('text', 'Text is required').notEmpty(),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const user = await User.findById(req.user.id).select('-password');
//       const post = await Post.findById(req.params.id);

//       const newComment = {
//         text: req.body.text,
//         name: user.name,
//         avatar: user.avatar,
//         user: req.user.id
//       };

//       post.comments.unshift(newComment);

//       await post.save();

//       res.json(post.comments);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// // @route    DELETE api/posts/comment/:id/:comment_id
// // @desc     Delete comment
// // @access   Private
// router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Pull out comment
//     const comment = post.comments.find(
//       (comment) => comment.id === req.params.comment_id
//     );
//     // Make sure comment exists
//     if (!comment) {
//       return res.status(404).json({ msg: 'Comment does not exist' });
//     }
//     // Check user
//     if (comment.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'User not authorized' });
//     }

//     post.comments = post.comments.filter(
//       ({ id }) => id !== req.params.comment_id
//     );

//     await post.save();

//     return res.json(post.comments);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).send('Server Error');
//   }
// });

module.exports = router;
