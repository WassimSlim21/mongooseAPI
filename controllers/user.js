const User = require("../models/user");
const Company = require('../models/company');
const jwt = require('jsonwebtoken');


//login function

exports.login = async (req, res,next) => {
  User.findOne({
    userName: req.body.userName
    }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(),'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h'
        });
          // return the information including token as JSON
        var   responseUser = {
            email: user.email,
            role: user.role,
            userName: user.userName,
            _id : user._id
          } 
          res.json({success: true, token: token ,user: responseUser});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
}



/* Sign Up function */
exports.signup = async (req, res, next) => {
  
    if (!req.body.email || !req.body.password) {
      res.json({success: false, msg: 'Please pass email and password.'}); //missing parameters
    } else {
      var newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });
      // save the user
     
      
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'email or username already exists'}); //If email exists already
        }
        res.json({success: true, msg: 'Successful created new user.'});  //creation successfull
      });
    }
    

}

//Get Account Function
exports.getUser = (req, res, next) => {
  User.findById(req.params.id).then(user => {
    res.send(user);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });
}

/*
//Update User Role
*/

exports.updateUserRole = (req, res, next) => {
	user = new Object();
	console.log(req.body);

	if (req.body.role)
		{user.role = req.body.role;}
	console.log("new Account is :", user);
	User.updateOne({ _id: req.params.id }, user).then(
		() => {
			res.status(201).json({
				message: 'Account role updated !'
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