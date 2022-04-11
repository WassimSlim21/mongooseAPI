var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');

var userCtl = require("../controllers/user");

/* GET get Account*/
router.get('/get/:id',auth, userCtl.getUser)

/* GET get all Accounts*/
router.get('/get', auth, userCtl.getAllUsers)
/* POST login account */
router.post('/login', userCtl.login );
  
/* POST create account */
router.post('/register', userCtl.signup);

/* PUT update account */
router.put('/update'  , auth, userCtl.updateUserRole);
  


module.exports = router;
