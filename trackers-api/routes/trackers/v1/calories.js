var express = require('express');
var router = express.Router();
var db = require('./../../../db/db')
router.get('/search', async function (req, res, next) {

  try {
    query = req.query;
    name = query.name || ''
    page = parseInt(query.page) || 0
    list_per_page = parseInt(query.list_per_page) || 5

    var result = await db.searchMealNutritionalDatabase(name)
    var search_result = await result.toArray()
    var reduced_result = []
    var i, j;
    for (i = 0, j = search_result.length; i < j; i += list_per_page) {
      var temparray = search_result.slice(i, i + list_per_page);
      reduced_result.push(temparray);
      // do whatever
    }

    res.send({
      "results": reduced_result[page] || []
    })
  }
  catch (e) {
    console.error(e)
    res.send({
      "error": true,
      "error_description": e.error
    })
  }
});
router.post('/add/:uid/breakfast', async (req, res) => {
  try {
    uid = req.params.uid
    body = req.body
    date = (Date.parse(body.date_string)) || new Date().toDateString()//.toISOString()
    date = new Date(date).toISOString()

    meal_list = req.body.meal_list || []
    calories_list = req.body.calories_list || []
    quantities_in_grams = req.body.quantities_in_grams || []
    total_calories = req.body.total_calories || 0
    breakfast = {
      'meal_list': meal_list,
      'calories_list': calories_list,
      'quantities_in_grams': quantities_in_grams,
      'total_calories': total_calories
    }
    return await db.addBreakfastForUser(uid, date, breakfast)
      .then(() => res.send({
        'error': false
      }))

  } catch (error) {
    console.error(error)
    res.send({
      "error": true,
      "description": " "
    })
  }
})
router.post('/add/:uid/morning_snack', async (req, res) => {
  try {
    uid = req.params.uid
    body = req.body
    date = (Date.parse(body.date_string)) || new Date().toDateString()//.toISOString()
    date = new Date(date).toISOString()

    meal_list = req.body.meal_list || []
    calories_list = req.body.calories_list || []
    quantities_in_grams = req.body.quantities_in_grams || []
    total_calories = req.body.total_calories || 0
    morning_snack = {
      'meal_list': meal_list,
      'calories_list': calories_list,
      'quantities_in_grams': quantities_in_grams,
      'total_calories': total_calories
    }

    return db
      .addMorning_snackForUser(uid, date, morning_snack)
      .then(() => res.send({
        'error': false
      }))
  } catch (error) {
    console.error(error)
    res.send({
      "error": true,
      "description": " "
    })
  }
})
router.post('/add/:uid/lunch', async (req, res) => {
  try {
    uid = req.params.uid
    body = req.body
    date = (Date.parse(body.date_string)) || new Date().toDateString()//.toISOString()
    date = new Date(date).toISOString()

    meal_list = req.body.meal_list || []
    calories_list = req.body.calories_list || []
    quantities_in_grams = req.body.quantities_in_grams || []
    total_calories = req.body.total_calories || 0
    lunch = {
      'meal_list': meal_list,
      'calories_list': calories_list,
      'quantities_in_grams': quantities_in_grams,
      'total_calories': total_calories
    }

    return db
      .addLunchForUser(uid, date, lunch)
      .then(() => res.send({
        'error': false
      }))
  } catch (error) {
    console.error(error)
    res.send({
      "error": true,
      "description": " "
    })
  }
})
router.post('/add/:uid/evening_snack', async (req, res) => {
  try {
    uid = req.params.uid
    body = req.body
    date = (Date.parse(body.date_string)) || new Date().toDateString()//.toISOString()
    date = new Date(date).toISOString()

    meal_list = req.body.meal_list || []
    calories_list = req.body.calories_list || []
    quantities_in_grams = req.body.quantities_in_grams || []
    total_calories = req.body.total_calories || 0
    evening_snack = {
      'meal_list': meal_list,
      'calories_list': calories_list,
      'quantities_in_grams': quantities_in_grams,
      'total_calories': total_calories
    }
    return db
      .addEvening_snackForUser(uid, date, evening_snack)
      .then(() => res.send({
        'error': false
      }))

  } catch (error) {
    console.error(error)
    res.send({
      "error": true,
      "description": " "
    })
  }
})
router.post('/add/:uid/dinner', async (req, res) => {
  try {
    uid = req.params.uid
    body = req.body
    date = (Date.parse(body.date_string)) || new Date().toDateString()//.toISOString()
    date = new Date(date).toISOString()

    meal_list = req.body.meal_list || []
    calories_list = req.body.calories_list || []
    quantities_in_grams = req.body.quantities_in_grams || []
    total_calories = req.body.total_calories || 0
    dinner = {
      'meal_list': meal_list,
      'calories_list': calories_list,
      'quantities_in_grams': quantities_in_grams,
      'total_calories': total_calories
    }
    return db
      .addDinnerForUser(uid, date, dinner)
      .then(() => res.send({
        'error': false
      }))
  } catch (error) {
    console.error(error)
    res.send({
      "error": true,
      "description": " "
    })
  }
})
router.post('/add/:uid/entire_day_meal', async function (req, res, next) {
  try {
    uid = req.params.uid
    body = req.body
    date = (Date.parse(body.date_string)) || new Date().toDateString()//.toISOString()
    date = new Date(date).toISOString()

    breakfast = JSON.parse(body.breakfast) || { 'meal_list': [], 'calories_list': [], 'quantities_in_grams': [], 'total_calories': 0 }
    morning_snack = JSON.parse(body.morning_snack) || { 'meal_list': [], 'calories_list': [], 'quantities_in_grams': [], 'total_calories': 0 }
    lunch = JSON.parse(body.lunch) || { 'meal_list': [], 'calories_list': [], 'quantities_in_grams': [], 'total_calories': 0 }
    evening_snack = JSON.parse(body.evening_snack) || { 'meal_list': [], 'calories_list': [], 'quantities_in_grams': [], 'total_calories': 0 }
    dinner = JSON.parse(body.dinner) || { 'meal_list': [], 'calories_list': [], 'quantities_in_grams': [], 'total_calories': 0 }

    res.send({
      'error': false
    })
  } catch (error) {
    console.error(error)
    res.send({
      "error": true,
      "description": " "
    })
  }
})
router.get('/get/:uid',async(req,res) => {
  uid = req.params.uid
  if (req.params.start_date && req.params.end_date ){
    start_date = (Date.parse(req.params.start_date)) || new Date().toDateString()//.toISOString()
    start_date = new Date(start_date).toISOString() 

    end_date = (Date.parse(req.params.end_date)) || new Date().toDateString()//.toISOString()
    end_date = new Date(end_date).toISOString() 
    var results = await db.getMealdataBetweenDates(uid,start_date,end_date)

    res.json({
      'results':results
    })
  } else {
    date = (Date.parse(req.params.date)) || new Date().toDateString()//.toISOString()
    date = new Date(date).toISOString()
    var results = await db.getMealdataFromDate(uid,date)

    res.json({
      'results':results
    })
  }
})
module.exports = router;
