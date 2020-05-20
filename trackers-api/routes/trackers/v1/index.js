var express = require('express');
var router = express.Router();

var caloriesRouter = require('./calories');
var waterRouter = require('./water');
var weightRouter = require('./weight');

router.use('/calories',caloriesRouter);
router.use('/water',waterRouter);
router.use('/weight',weightRouter);
module.exports = router;