const srvUrl = require('./../credentials/db.json').srvUrl
const { MongoClient } = require('mongodb');
const client = new MongoClient(srvUrl, { useUnifiedTopology: true });
client
    .connect()
    .then(() => console.log(" mongo client connected status", client.isConnected()))
    .catch((e) => console.error("failed to connect with mongodb reason\n\n\n\n\n\n\n\n", e))
module.exports = {
    searchMealNutritionalDatabase: async (name) => {
        return await client.db('nutrition_database')
            .collection('v1')
            .find({
                "$text": {
                    "$search": name
                }
            })
    },
    addMealDataForUser: async (uid, date, breakfast, morning_snack, lunch, evening_snack, dinner) => {
        return await client.db('tracker_database')
            .collection(`meal_tracker.${uid}`)
            .updateOne(
                { 'date': date },
                {
                    '$set': {
                        'breakfast': breakfast,
                        'morning_snack': morning_snack,
                        'lunch': lunch,
                        'evening_snack': evening_snack,
                        'dinner': dinner,
                        'date': date
                    }
                },
                { upsert: true }
            )
    }
    , addBreakfastForUser: async (uid, date, breakfast) => {
        return await client.db('tracker_database')
            .collection(`meal_tracker.${uid}`)
            .updateOne(
                { 'date': date },
                {
                    '$set': {
                        'breakfast': breakfast,
                        'date': date
                    }
                },
                { upsert: true }
            )
    }
    , addMorning_snackForUser: async (uid, date, morning_snack) => {
        return await client.db('tracker_database')
            .collection(`meal_tracker.${uid}`)
            .updateOne(
                { 'date': date },
                {
                    '$set': {

                        'morning_snack': morning_snack,
                        'date': date

                    }
                },
                { upsert: true }
            )
    }
    , addLunchForUser: async (uid, date, lunch) => {
        return await client.db('tracker_database')
            .collection(`meal_tracker.${uid}`)
            .updateOne(
                { 'date': date },
                {
                    '$set': {

                        'lunch': lunch,
                        'date': date

                    }
                },
                { upsert: true }
            )
    }
    , addEvening_snackForUser: async (uid, date, evening_snack) => {
        return await client.db('tracker_database')
            .collection(`meal_tracker.${uid}`)
            .updateOne(
                { 'date': date },
                {
                    '$set': {

                        'evening_snack': evening_snack,
                        'date': date

                    }
                },
                { upsert: true }
            )
    }
    , addDinnerForUser: async (uid, date, dinner) => {
        return await client.db('tracker_database')
            .collection(`meal_tracker.${uid}`)
            .updateOne(
                { 'date': date },
                {
                    '$set': {
                        'dinner': dinner,
                        'date': date
                    }
                },
                { upsert: true }
            )
    },
    getMealdataFromDate: async (uid, date) => {
        return await client.db('tracker_database')
            .collection(`meal_tracker.${uid}`)
            .find({
                'date': { $lte: date }
            }).toArray()
    },
    getMealdataBetweenDates: async (uid, StartDate, endDate) => {
        return await client.db('tracker_database')
            .collection(`meal_tracker.${uid}`)
            .find({
                'date': { $gte: StartDate, $lte: endDate }
            }).toArray()
    }
    , water: {
        add: async (uid, day, quantity_in_ml) => {
            return await client.db('tracker_database')
                .collection(`water_tracker.${uid}`)
                .updateOne(
                    { 'day': day },
                    {
                        '$set': {
                            'day': day,
                            'quantity_in_ml': quantity_in_ml
                        }
                    },
                    { upsert: true }
                )
        },
        fetchTodayIntake: async(uid,day) => {
            return await client.db('tracker_database')
            .collection(`water_tracker.${uid}`)
            .find({
                'day': {$lte: day }
            }).toArray()
        }
        ,
        getLogs: async (uid, start_day, end_day) => {
            return await client.db('tracker_database')
                .collection(`water_tracker.${uid}`)
                .find({
                    'day': { $gte: start_day, $lte: end_day }
                }).toArray()
        }
    }
    ,weight : {
        add: async(uid,day,weight_in_kgs) => {
            return await client.db('tracker_database')
            .collection(`weight_tracker.${uid}`)
            .updateOne({
                'day':day},
                {
                    '$set': {
                        'day':day,
                        'weight_in_kgs': weight_in_kgs
                    }
                }
            )
        },
        getLogs: async(uid,start_date,end_date)=>{
            return await client.db('tracker_database')
            .collection(`weight_tracker.${uid}`)
            .find({
                'day': { $gte: start_date, $lte: end_date }
            }
            ).toArray()
        }
    }
}