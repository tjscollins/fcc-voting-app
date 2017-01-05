'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollModel = new Schema({
  question: {
    text: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    _creator: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  responses: {
    options: Array,
  },
});

module.exports = mongoose.model('Poll', pollModel);
