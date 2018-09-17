const router = require('express').Router();
const { respond, getParam } = require('./route-helpers');
const Record = require('../models/Record');
// const ensureAuth = require('../util/ensure-auth.js')();

module.exports = router
    .param('id', getParam)
    .get('/', respond(
        ({ query }) => Record.getByQuery(query)
    ))
    .get('/:id', respond(
        ({ id }) => Record.getDetailById(id)
    ))
    .post('/', respond(
        ({ body }) => Record.create(body) 
    ))

    .get('/stats/:id', (req, res, next) => {
        Record.statsById(req.id)
            .then(([results]) => {
                const totalWins = results.totalWins[0] ? results.totalWins[0].totalWins : 0;
                const totalGames = results.totalGames[0] ? results.totalGames[0].totalGames : 0;
                return { totalWins, totalGames };
            })
            .then(results => res.json(results))
            .catch(next);
    })

    // eslint-disable-next-line
    .get('/ranks/leaderboard', (req, res, next) => {
        Record.leaderboard()
            .populate('_id', 'name')
            .then((results) => {
                res.json(results);
            })
            .catch(next);
    });