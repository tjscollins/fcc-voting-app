const {ObjectID} = require('mongodb');
const pollModel = require('./../../server/models/polls.js');

const pollOneID = new ObjectID();
const pollTwoID = new ObjectID();

const polls = [
  {
    '_id': pollOneID,
    'responses': {
        'answers': [
            1,
            1,
        ],
    },
    'question': {
        'displayName': 'A Simple Test of Your Intellect',
        'text': 'Who is the greatest Starfleet Captain?',
        'answers': [
            'Kirk',
            'Picard',
        ],
    },
  },
  {
    '_id': pollTwoID,
    'responses': {
        'answers': [
            1,
            1,
        ],
    },
    'question': {
        'displayName': 'Where\'s the beef?',
        'text': 'Where\'s the beef?',
        'answers': [
            'Neither Here',
            'Nor There',
        ],
    },
  },
];

const populateServer = (done) => {
  pollModel.remove({}).then(() => {
    return pollModel.insertMany(polls);
  });
  done();
};

module.exports = {
  polls, populateServer,
};
