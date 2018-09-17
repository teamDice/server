const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Auth API', () => {
    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('profiles'));

    let token, profile;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                email: 'me@me.com',
                name: 'tester',
                password: 'abc'
            })
            .then(({ body }) => {
                token = body.token;
                profile = body.profile;
            });
    });

    it('will signup a user', () => {
        assert.ok(token);
        assert.equal(profile.name, 'tester');
        assert.equal(profile.rank, 'Captain');
    });

    it('verifies', () => {
        return request
            .get('/api/auth/verify')
            .set('Authorization', token)
            .then(({ body }) => {
                assert.isOk(body.verified);
            });
    });

    it('signs in', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'me@me.com',
                password: 'abc'
            })
            .then(({ body }) => {
                assert.equal(body.profile.name, 'tester');
                assert.ok(body.token);

            });
    });
    it('Gives 400 on signup of same email', () => {
        return request
            .post('/api/auth/signup')
            .send({
                email: 'me@me.com',
                password: 'abc'
            })
            .then(res => {
                assert.equal(res.status, 400);
                assert.equal(res.body.error, 'Email exists');
            });
    });

    it('Gives 401 on non-existent email', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'bad@me.com',
                password: 'abc'
            })
            .then(res => {
                assert.equal(res.status, 401);
                assert.equal(res.body.error, 'Invalid email or password');
            });
    });

    it('Gives 401 on bad password', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'me@me.com',
                password: 'bad'
            })
            .then(res => {
                assert.equal(res.status, 401);
                assert.equal(res.body.error, 'Invalid email or password');
            });
    });
});