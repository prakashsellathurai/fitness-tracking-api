var express = require('express');
var router = express.Router();
var db = require('./../../../db/db')
router.post('/add/:uid', async function (req, res, next) {
  time = req.body.time
  uid = req.params.uid
  quantity_in_ml = req.body.quantity_in_ml
  return db.water.add(uid, time, quantity_in_ml)
    .then(() => res.send({
      'error': false
    }))

});
router.get('/get/:uid', async function (req, res, next) {
  start_time = req.params.start_time
  uid = req.params.uid
  end_time = req.params.end_time
  result = await db.water.getLogs(uid, start_time, end_time)
  res.send({
    'results': result
  })

});
module.exports = router;
