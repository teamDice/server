const router = require('express').Router();
const Profile = require('../models/Profile');

const { getParam, respond } = require('./route-helpers');

module.exports = router

    .param('id  ', getParam)

    .get('/', respond(
        ({ user }) => Profile.findById('5ba433fe654753df24cf87ab')
    ))

    .post('/', respond(
        ({ body }) => Profile.create(body)
    ));