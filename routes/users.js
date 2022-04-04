var express = require('express');
var router = express.Router();
var userCtl = require("../controllers/user");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add',userCtl.addUser);
router.post('/addMultiple',userCtl.addMultipleUser);
router.get('/all',userCtl.getAllUsers);
router.get('/:id',userCtl.getUserByid);
router.put('/:id',userCtl.updateUserPack);

module.exports = router;
