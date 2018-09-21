const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { RequiredString } = require('./required-types');

const schema = new Schema({
    name: RequiredString,
    avatar: {
        type: String,
        default: 'cat.png'
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