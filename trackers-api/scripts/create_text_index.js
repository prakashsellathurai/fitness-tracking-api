const srvUrl = require('./../credentials/db.json').srvUrl
const {MongoClient} = require('mongodb');
const client = new MongoClient(srvUrl,{ useUnifiedTopology: true });

client
.connect()
.then(() => {
    client.
    db('nutrition_database')
    .collection('v1')
    .createIndex({
        "name":"text"
    })
    .then(() => {
        sys.exit(0)
    })
})
.catch((e) => console.error("failed to connect with mongodb reason\n\n\n\n\n\n\n\n",e))
