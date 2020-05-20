const srvUrl = require('./../credentials/db.json').srvUrl
const {MongoClient} = require('mongodb');
const client = new MongoClient(srvUrl,{ useUnifiedTopology: true });
client
.connect()
.then(() => console.log(" mongo client connected status",client.isConnected()))
.catch((e) => console.error("failed to connect with mongodb reason\n\n\n\n\n\n\n\n",e))
async function getUserCollection () {
        return await client.db("user-database").collection("users-data")
}
module.exports = {
    listDatabases:async function (){
        databasesList = await client.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    },
    isUserExist: async function(uid){
        const collection = await getUserCollection(client)
        var userList = await collection.find({uid:uid}).toArray()
        return userList.length != 0
    },
    getUserData: async function(uid) {
        const collection = await getUserCollection(client)
        var userData = await collection.find({uid:uid}).toArray()
        userData = userData[0] ? userData[0] : {}
        return userData
    }
    ,
    getAllUsers:async function(){
        const collection = await getUserCollection(client)
        var userslist = await collection.find({}).toArray()
        return userslist
    },
    createUser: async function (user_data){
        const collection = await getUserCollection(client)
        result = await (await collection.insertOne(user_data)).result;
        return result
       },
    updateUser: async function (uid,update_data){
        const collection = await getUserCollection(client)
        await collection.updateOne({"uid":uid},
            {
                $set: update_data
            })
     },
     deleteUser:
     async function (uid){
        const collection = await getUserCollection(client)
        await collection.remove({"uid":uid})
     }
}





