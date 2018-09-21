const router = require('express').Router();
const Profile = require('../models/Profile');

const { getParam, respond } = require('./route-helpers');

module.exports = router

    .param('id  ', getParam)

    .get('/', respond(
        ({ user }) => Profile.findById(user.profileId)
    ))

    .put('/', respond(
        ({ user, body }) => Profile.findByIdAndUpdate(
            user.profileId,
            body,
            {
                new: true,
                runValidators: true
            }
        )
    ));