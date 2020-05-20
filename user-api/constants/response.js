module.exports = {
      SUCCESS:{
        "status":"success"
      },
      FAILURE:function (description) {
        return {
          status:"error",
          description:str(description)
        }
      } ,
      USER_DOES_NOT_EXIST: {
        status: "error",
        description: "user does not exist"
      }
}