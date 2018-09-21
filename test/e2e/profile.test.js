const { assert } = require('chai');
const { dropCollection, createToken } = require('./db');
const request = require('./request');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

describe('Profile API', () => {

    before(() => dropCollection('profile'));
    before(() => dropCollection('users'));

    let token = '';
    before(() => createToken().then(t => token = t));

    const profile1 = {
        name: 'Arthur',
        avatar: 'avatar.png',
        location: 'Portland',
        greeting: 'Prepare to Lose'
    };

    it.only('gets a profile', () => {
        console.log('toke', token);
        return request
            .get('/api/profile')
            .set('Authorization', token)
            .then(({ body }) => {
                // assert.isOk(body);
                console.log('body', body);
                // assert.deepEqual(body, profile1);
            });
    });      


    it('updates a profile', () => {
        profile1.greeting = 'I am a Winner!';

        return request.put(`/api/profile/${profile1._id}`)
            .send(profile1)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, profile1);
                return request.get(`/api/profile/${profile1._id}`);
            })
            .then(({ body }) => {
                assert.equal(body.profile1, profile1.greeting);
            });
    });
});
