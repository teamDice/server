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

describe('the Records API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('records'));
    beforeEach(() => dropCollection('profiles'));

    let token1, token2, profile1, profile2, record;

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
            winnerId: player1Id
        };
        return save('records', data, token1)
            .then(data => {
                record = data;
            });
    });

    it('posts stuff', () => {
        assert.equal(record.players.length, 2);
    });

});