var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  userName: {
    type: String,
    required: false,
    unique: true,
},
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
  status: {
    type: String,
    default: "0"
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_at: {
    type: Date,
    default: null
  },
  deleted_at: {
    type: Date,
    default: null
  },
  password: {
    type: String,
    required: true
  },

  phone: {
    type: String
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
    {
      type: String,
      ref: "Publication"
    }
  ],
  role: {
    type: String,
    enum: ['admin', 'super-admin'],
    default: 'admin'
  },

});

//Hashing password before insert user
UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
          if (err) {
              return next(err);
          }
          bcrypt.hash(user.password, salt, null, function (err, hash) {
              if (err) {
                  return next(err);
              }
              user.password = hash;
              next();
          });
      });
  } else {
      return next();
  }
});


UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', UserSchema);



