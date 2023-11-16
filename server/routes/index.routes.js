const router = require("express").Router();

router.use('/comments', require('./comments.routes'))
router.use('/snippets', require('./snippets.routes'))
router.use("/auth", require('./auth.routes'))
router.use("/users", require('./users.routes'))
router.use("/upload", require('./upload.routes'))

module.exports = router;
