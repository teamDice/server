const { assert } = require('chai');
const Match = require('../../lib/models/Match');
const { getErrors } = require('./helpers');
const { Types } = require('mongoose'); 

describe('Match Model', () => {
    it('validates a good match model', () => {
        const data = {
            players: [Types.ObjectId(), Types.ObjectId()],
            game: {
                player1Id: {
                    troops: 2,
                    wins: 2
                },
                player2Id: {
                    troops: 1,
                    wins: 1
                },
                winner: Types.ObjectId()
            }
        };

        const match = new Match(data);

        data._id = match._id;
        assert.deepEqual(match.toJSON(), data);
    });

    it('validates that fields are required', () => {
        const match = new Match({});

        const errors = getErrors(match.validateSync(), 2);
        assert.equal(errors.players.kind, 'required');
        assert.equal(errors.game.kind, 'required');
    });
});