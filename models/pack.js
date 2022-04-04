var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pack = new Schema({
  pack_name: {
    type: String
  },
  created_at : {
    type :  Date,
    default: new Date()
 },
  updated_at : {
    type :  Date,
    default: null
 },
  deleted_at : {
    type :  Date,
    default: null
 },
  price: {
    type: Number
  },
  maxFansNumber: {
    type: Number
  }
  
});
module.exports = mongoose.model('Pack', Pack);
