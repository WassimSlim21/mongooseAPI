const Pack = require("../models/pack");

exports.addPack = (req, res, next) => {
    var pack = new Pack(req.body);
    pack.save().then(data => {
        return res.status(201).json({ success: true, msg: 'Successful created new Pack', data:data });  //creation successfull
      }).catch(err => {
        return res.status(403).json({ err: err });
      });
  }
  

  exports.addMultiplePack = (req, res, next) => {

     Pack.insertMany(req.body.packs).then(function(){
         return res.status(201).json({ success: true, msg: 'Successful created multiple Pack'});  //creation successfull
     }).catch(function(error){
         console.log(error)      // Failure
     });
 
     
   }

   exports.getAllPacks = (req, res, next) => {
	Pack.find().then(packs => {
		res.send(packs);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
  };