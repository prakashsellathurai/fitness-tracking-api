const srvUrl = require('./../credentials/db.json').srvUrl
const {MongoClient} = require('mongodb');
const client = new MongoClient(srvUrl,{ useUnifiedTopology: true });
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

function refine_the_strings(input_) {
    floatNum = parseFloat(input_)
    return (isNaN(floatNum)) ? 0 : floatNum
}
client
.connect()
.then(() => {
    
    console.log(" mongo client connected status",client.isConnected())
    nutrition_data = []

    fs.createReadStream(path.resolve(__dirname, './food- nutrition-data-sheet_INT Nutritional data.csv'))
        .pipe(csv.parse())
        .on('error', error => console.error(error))
        .on('data', row => nutrition_data.push(row))
        .on('end', (rowCount) => {
            console.log(`Parsed ${rowCount} rows`)
            var schema = nutrition_data[3]
            nutrition_data.splice(0, 4)
            data_jsons = []
            for (index in nutrition_data) {
                // var index = nutrition_data.indexof(data)
                [name_of_meal, proteins, fat, fiber, carbs, calories] = nutrition_data[index]
                data_json = {
                    "name": name_of_meal,
                    "proteins_in_grams": refine_the_strings(proteins),
                    "fat_in_grams": refine_the_strings(fat),
                    "fibers_in_grams": refine_the_strings(fiber),
                    "carbs_in_grams": refine_the_strings(carbs),
                    "total_calories": refine_the_strings(calories),
                    "quantity_in_grams": 100
                }
                data_jsons.push(data_json)
                    console.log(data_json['total_calories'],calories,data_json["name"])
            }
            // client
            // .db('nutrition_database')
            // .collection('v1')
            // .updateMany(data_jsons).then((res)=> console.log(res))
        });
    
    
    


})
.catch((e) => console.error("failed to connect with mongodb reason\n\n\n\n\n\n\n\n",e))

