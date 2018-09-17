const { assert } = require('chai');
const { dropCollection } = require('./db');
const request = require('./request');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

const testUser = {
    email: 'me@me.com',
    name: 'tester1',
    password: 'abc'
};
const testUser2 = {
    email: 'otherme@me.com',
    name: 'tester2',
    password: '123'
};

const save = (path, data, token) => {
    return request
        .post(`/api/${path}`)
        .set('Authorization', token)
        .send(data)
        .then(checkOk)
        .then(({ body }) => body);
};

describe('the Matches API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('gameHistory'));
    beforeEach(() => dropCollection('profiles'));

    let token1, token2, profile1, profile2, match;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(testUser)
            .then(checkOk)
            .then(({ body }) => {
                token1 = body.token;
                profile1 = body.profile;
                assert.isOk(token1);
            });
    });
    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(testUser2)
            .then(checkOk)
            .then(({ body }) => {
                token2 = body.token;
                profile2 = body.profile;
                assert.isOk(token2);
            });
    });

    beforeEach(() => {
        const player1Id = profile1._id;
        const player2Id = profile2._id;
        const data = {
            players: [player1Id, player2Id],
            game: {
                [player1Id]: {
                    troops: 2,
                    wins: 2
                },
                [player2Id]: {
                    troops: 1,
                    wins: 1
                },
                winner: player1Id
            },
        };
        return save('matches', data, token1)
            .then(data => {
                match = data;
            });
    });

    it('posts shit', () => {
        assert.equal(match.players.length, 2);
    });

<<<<<<< HEAD
    it('GETS user\'s stats', () => {
        return request
            .get(`/api/matches/stats/${profile1._id}`)
            // .set('Authorization', token1)
            .then(checkOk)
            .then(({ body }) => {
                console.log('BODY', body);
                assert.deepEqual(body, { totalWins: 1, totalGames: 1 });
            });
    });
=======
    // it('gets a match out of the database by id', () => {
    //     return request
    //         .get(`/api/matches/${}`)
    //         .then(checkOk)
    // })
>>>>>>> b20da33656f03b2d4cfee009b5e2192d72626406
});