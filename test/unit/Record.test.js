const { assert } = require('chai');
const Record = require('../../lib/models/Record');
const { getErrors } = require('./helpers');
const { Types } = require('mongoose'); 

describe('Record Model', () => {
    it('validates a good record model', () => {
        const data = {
            players: [Types.ObjectId(), Types.ObjectId()],
            winnerId: Types.ObjectId()
        };

        const record = new Record(data);

        data._id = record._id;
        assert.deepEqual(record.toJSON(), data);
    });

    it('validates that fields are required', () => {
        const record = new Record({});

        const errors = getErrors(record.validateSync(), 2);
        assert.equal(errors.players.kind, 'required');
    });
});