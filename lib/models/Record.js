const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const { Schema } = mongoose;


const schema = new Schema (
    {
        players: {
            type: [Schema.Types.ObjectId],
            ref: 'Profile',
            required: true,
            default: void 0
        },
        winnerId: {
            type: Schema.Types.ObjectId,
            ref:'Profile',
            required: true
        }, 
    },
    {
        timestamps: true
    }
);

schema.statics.statsById = function(userId) {
    return this.aggregate([
        { $facet: {
            'totalWins': [
                { $record: { 'game.winner': userId } },
                { $count: 'totalWins' }
            ],

            'totalGames': [
                { $record: { players: ObjectId(userId) } },
                { $count: 'totalGames' }
            ]
        } }
    ]);
};

schema.statics.leaderboard = function() {
    return this.aggregate([
        { $group: {
            _id: '$winnerId',
            wins: { $sum: 1 } }   
        },
        {
            $lookup: {
                from: 'profiles',
                localField: '_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        { $unwind: '$user' },
        { 
            $sort: { wins: -1 }
        }
    ]);
};

module.exports = mongoose.model('Record', schema);