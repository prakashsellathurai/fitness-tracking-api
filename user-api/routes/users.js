var express = require('express');
var router = express.Router();
var mongoDbUser = require('./../db/users.js')
var responseString = require('./../constants/response')


router.post('/:uid/create',async function(req, res) {
  var uid = req.params.uid
  var userdata = JSON.parse(JSON.stringify(req.body))
  userdata.uid = uid
  try {
    var isUserExist = await mongoDbUser.isUserExist(uid)
    if (!isUserExist) {
      return mongoDbUser.createUser(userdata)
      .then(() => res.json(responseString.SUCCESS))
    } else{
      return mongoDbUser.updateUser(uid,userdata)
      .then(() => res.json(responseString.SUCCESS))
    }

  } catch (error) {
    console.log(error)
     return res.json(responseString.FAILURE(error))
  }
});

router.post('/:uid/update', function(req, res) {
  var uid = req.params.uid
  var userdata = JSON.parse(JSON.stringify(req.body))
  try {
    return mongoDbUser.updateUser(uid,userdata)
    .then( () =>  mongoDbUser.getUserData(uid))
    .then((user_data) => {
      var response_json = {
        status: responseString.SUCCESS.status
      }
      response_json["user_data"] = user_data
      
       res.json(response_json)
    })
  } catch (error) {
     res.json(responseString.FAILURE(error))
  }
});

router.post('/:uid/delete', function(req, res) {
  var uid = req.params.uid

  try {
    return mongoDbUser.deleteUser(uid)
    .then(() => res.json(responseString.SUCCESS))
  } catch (error) {
     res.json(responseString.FAILURE(error))
  }
});

router.get('/getall',function(req,res){
  try {
    return mongoDbUser.getAllUsers()
    .then((usersList)=> {
      var response_json = {
        status: responseString.SUCCESS.status
      }
      response_json.userList = usersList
      return res.json(response_json)
    })
  } catch (error) {
    return res.json(responseString.FAILURE(error))
  }
})
router.get('/:uid',async function(req,res) {
  var uid = req.params.uid
  try {
    var isUserExist = await mongoDbUser.isUserExist(uid)
    if (isUserExist) {
        var user_data = await mongoDbUser.getUserData(uid)
        var response_json = {
          status: responseString.SUCCESS.status
        }
        response_json["user_data"] = user_data
        console.log(response_json)
        return res.json(response_json)
    } else {
        return res.json(responseString.USER_DOES_NOT_EXIST)
    }
  } catch (error) {
    res.json(responseString.FAILURE(error))
  }
})
module.exports = router;
