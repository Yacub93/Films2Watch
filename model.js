var mongoose = require('mongoose');

module.exports = mongoose.Schema({
   title       : {type: String, min: 8, max: 50, required: true},
   overview    : {type: String, required: true},
   poster      : {type: String, min: 3, max: 50},
   genres      : {type: String, min: 3, max: 50},
   release     : {type: Date, default: Date.now}
});