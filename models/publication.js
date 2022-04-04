var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Publication = new Schema({


   user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   content: {
      type: String
   },
   created_at: {
      type: Date,
   },
   updated_at: {
      type: Date,
    },
   deleted_at: {
      type: Date
   }
});



module.exports = mongoose.model('Publication', Publication);
