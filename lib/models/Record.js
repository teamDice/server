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
        game: {
            type: Object,
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
                { $match: { 'game.winner': userId } },
                { $count: 'totalWins' }
            ],

            'totalGames': [
                { $match: { players: ObjectId(userId) } },
                { $count: 'totalGames' }
            ]
        } }
    ]);
};

schema.statics.leaderboard = function() {
    return this.aggregate([
        { $group: {
            _id: '$game.winner',
            wins: { $sum: 1 } }   
        },
        { 
            $sort: { wins: -1 }
        }
    ]);
};

module.exports = mongoose.model('Matches', schema);