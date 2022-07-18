const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


router.use('/comments', require('./comment.routes'))
router.use('/snippets', require('./snippet.routes'))

module.exports = router;
