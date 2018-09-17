const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { RequiredString } = require('./required-types');

const schema = new Schema({
    name: RequiredString,
    avatar: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Profile', schema);