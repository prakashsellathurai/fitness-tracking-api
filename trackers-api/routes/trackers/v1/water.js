var express = require('express');
var router = express.Router();
var db = require('./../../../db/db')
router.post('/add/:uid', async function (req, res, next) {
  day = req.body.day
  uid = req.params.uid
  quantity_in_ml = req.body.quantity_in_ml
  return db.water.add(uid, day, quantity_in_ml)
    .then(() => res.send({
      'error': false
    }))

});
router.post('/fetch/:uid', async function (req, res, next) {
  day = req.body.day
  uid = req.params.uid
  result = await db.water.fetchTodayIntake(uid, day)
  res.send({
    'results': result
  })
})
router.get('/get/:uid', async function (req, res, next) {
  start_day = req.params.start_day
  uid = req.params.uid
  end_day = req.params.end_day
  result = await db.water.getLogs(uid, start_day, end_day)
  res.send({
    'results': result
  })

});
module.exports = router;
