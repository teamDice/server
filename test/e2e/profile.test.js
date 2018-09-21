const { assert } = require('chai');
const { dropCollection, createToken } = require('./db');
const request = require('./request');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

describe('Profile API', () => {

    beforeEach(() => dropCollection('profiles'));
    beforeEach(() => dropCollection('users'));

    let token = '';
    beforeEach(() => createToken().then(t => token = t));

    const expectedProfile = {
        name: 'Arthur',
        avatar: 'avatar.png',
        location: '',
        greeting: 'Hello'
    };

    it('gets a profile', () => {
        return request
            .get('/api/profile')
            .set('Authorization', token)
            .then(checkOk)
            .then(({ body }) => {
                const { avatar, greeting, location, name } = body;
                assert.deepEqual({ avatar, greeting, location, name }, expectedProfile);
            });
    });      


    it('updates a profile', () => {
        const updatedProfile = {
            name: 'Arthur',
            avatar: 'shark.png',
            location: 'Portland',
            greeting: 'Bye'
        };

        return request.put('/api/profile/')
            .send(updatedProfile)
            .set('Authorization', token)
            .then(checkOk)
            .then(({ body }) => {
                const { avatar, greeting, location, name } = body;
                assert.deepEqual({ avatar, greeting, location, name }, updatedProfile);
            });
    });
});
