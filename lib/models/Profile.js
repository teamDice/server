const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { RequiredString } = require('./required-types');

const schema = new Schema({
    name: RequiredString,
    avatar: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/snakes-game-2b62c.appspot.com/o/avatars%2Fmonkey.png?alt=media&token=4410423d-8c4a-4164-8bd0-e8257400fe8f',

    },
    location: {
        type: String,
        default: ''
    },
    greeting: {
        type: String,
        default: 'Hello'
    }
});

module.exports = mongoose.model('Profile', schema);