var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
      name: {type: String},
      firstname: {
        type: String
      },
      lastname: {
        type: String
      },
      email: {
        type: String,
        unique: true // `email` must be unique

      },
      password : {
        type :  String 
     },
      status : {
        type :  String,
        default: "0"
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
      pwd : {
        type :  String 
     },
     
    phone : {
      type : String
    },
      pack: { 
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pack",
             },
      company: {
        type: mongoose.Schema.Types.ObjectId,
          ref: "Company"
      },
      
        publication: [
            { type: String,
            ref: "Publication"}
        ],

});



module.exports = mongoose.model('User', UserSchema);



