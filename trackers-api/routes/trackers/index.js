var express = require('express');
var router = express.Router();
var v1Router = require('./v1');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/v1',v1Router);

module.exports = router;
