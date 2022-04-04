const User = require("../models/user");
const Company = require('../models/company');


exports.addUser = (req, res, next) => {
    var user = new User(req.body);
    user.save().then(data => {
        return res.status(201).json({ success: true, msg: 'Successful created new User', data:data });  //creation successfull
      }).catch(err => {
        return res.status(403).json({ err: err });
      });
  }
  

  
exports.addMultipleUser = (req, res, next) => {
   // meth 1
    // req.body.users.forEach(u => {
    //     var user = new User(u);
    //     user.save().then(data => {
    //         console.log('****** Successful created new User ******', data); //creation successfull
    //     }).catch(err => {
    //         console.log('****** ERROR ******'); //creation successfull
    //       });
    // });

    User.insertMany(req.body.users).then(function(){
        return res.status(201).json({ success: true, msg: 'Successful created multiple User'});  //creation successfull
    }).catch(function(error){
        console.log(error)      // Failure
    });

    
  }

  exports.getAllUsers = (req, res, next) => {
	User.find().populate('pack').then(users => {
		res.send(users);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
  };

  exports.getUserByid = (req, res, next) => {

    User.findById(req.params.id).then(users => {
        res.send(users);
    }).catch(err => {
        console.log('ERROR', err)
        res.status(401).json({
            error: err
        });
    })
  };
  

  

  exports.updateUserPack= (req, res, next) => {
	user = new Object();
	if (req.body.pack)
	{
		user.pack = req.body.pack ;
	}  
	console.log("new user is :", user);
	user.updated_at = Date.now();
	User.updateOne({ _id: req.params.id }, user).then(
		() => {
			res.status(201).json({
				message: 'User Updated !'
			});
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
}