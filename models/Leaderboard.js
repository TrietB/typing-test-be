const mongoose = require('mongoose')
const {Schema} = mongoose


const leaderboardSchema = new Schema({
    category: {
        type: String , enum: ['lesson', 'game', 'test'],
    },
    level: Number,
    //kimit 100 users
    order: [{
        user: {type: Schema.Types.ObjectId, ref: "Users"},
        score: Number
    },]
    // validate: [arrayLimit, '{PATH} exceeds the limit of 10']
})


function validator (order){
    return order.length <= 100
}