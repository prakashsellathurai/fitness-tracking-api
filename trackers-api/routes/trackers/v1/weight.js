var express = require('express');
var router = express.Router();
var db = require('./../../../db/db')

router.post('/add/:uid', function (req, res, next) {
  uid = req.params.uid
  day = req.body.day
  weight_in_kgs = req.body.weight_in_kgs
  return db.weight.add(uid, day, weight_in_kgs)
    .then(() => res.send({
      'error': false
    }))
});
/* GET users listing. */
router.get('/get/:uid', function (req, res, next) {
  uid = req.params.uid
  start_date = req.params.start_date
  end_date = req.params.end_date
  result = await db.weight.getLogs(uid,start_date,end_date)
  res.send({
    'results': result
  })
});

module.exports = router;
